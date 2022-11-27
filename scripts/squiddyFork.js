const {
  checkUserBalances,
  checkSingleBalance,
  vaultBalanceSheet,
  mineBlocks,
} = require("./helpers/helpers");

const  hre = require("hardhat");
const {Contract} = require("ethers");
const DAI_ABI = require("../abis/dai.js");
const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  let signers = await hre.ethers.getSigners();
  let DAIContract = new Contract(DAI_ADDRESS, DAI_ABI, deployer);
  let squidContract;
  let vaultContract;
  let strategyContract;

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x075e72a5edf65f0a5f44699c7654c1a76941ddc8"], // 200 mln dai
  });

  const richDaiOwner = await hre.ethers.getSigner("0x075e72a5edf65f0a5f44699c7654c1a76941ddc8");
  DAIContract = new Contract(DAI_ADDRESS, DAI_ABI, richDaiOwner);


  async function transferDaiToSigners() {
    const toMint = hre.ethers.utils.parseEther("110000");
    for (let i = 0; i < signers.length; i++) {
      await DAIContract.transfer(signers[i].address, toMint);
    }
  }

  await transferDaiToSigners();


  async function deploySquid() {
    const Squid = await hre.ethers.getContractFactory("Squid");
    let squidDeploy = await Squid.deploy('0x0000000000000000000000000000000000000000');
    await squidDeploy.deployed();
    squidContract = squidDeploy.address;
    console.log("Squid deployed to:", squidContract);
  }

  async function deployVault() {
    const Vault = await hre.ethers.getContractFactory("Vault");
    let vaultDeploy = await Vault.deploy(DAI_ADDRESS, deployer.address,'SpumoniGardens', 'SG', squidContract);
    await vaultDeploy.deployed();
    vaultContract = vaultDeploy.address;
    console.log("Vault deployed to:", vaultContract);
  }

  async function deployStrategy() {
    let squidInstance = await hre.ethers.getContractAt("Squid", squidContract);
    let vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
    const daiStrategy = await hre.ethers.getContractFactory("DaiStrategy");
    let strategyDeploy = await daiStrategy.deploy(squidContract);
    await squidInstance.functions.setVault(DAI_ADDRESS ,vaultInstance.address);
    await strategyDeploy.deployed();
    strategyContract = strategyDeploy.address;
    await console.log("Strategy deployed to:", strategyContract);
  }

  async function setStrategy(){
    let squidInstance = await hre.ethers.getContractAt("Squid", squidContract);
    let strategyInstance = await hre.ethers.getContractAt("Vault", strategyContract);
    await squidInstance.functions.approveStrategy(DAI_ADDRESS, strategyInstance.address);
    await squidInstance.functions.setStrategy(DAI_ADDRESS, strategyInstance.address);
    await console.log("Strategy set");
  }

  async function depositUnderlyingToVault() {
    const depositAmount = ethers.utils.parseEther("10000");
    let vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
    let strategyInstance = await hre.ethers.getContractAt("DaiStrategy", strategyContract);

    for (let i = 0; i < signers.length; i++) {
        const instanceERC = DAIContract.connect(signers[i]);
        const instanceVAULT = vaultInstance.connect(signers[i]);
        await instanceERC.approve(vaultInstance.address, depositAmount);
        await instanceVAULT.deposit(depositAmount, signers[i].address);
      }

      await checkUserBalances(signers, vaultInstance.address);
      await vaultBalanceSheet(vaultInstance.address, strategyInstance.address);
      console.log("Deposited 10000 DAI to vault");
    }

  async function callEarnOnVault() {
    let vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
      await vaultInstance.functions.earn();
      await mineBlocks();
      await checkUserBalances(signers, vaultInstance.address);
    }

    async function callHarvestFromStrat() {
      let strategyInstance = await hre.ethers.getContractAt("DaiStrategy", strategyContract);
      let vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
      await strategyInstance.functions.harvest();
      await vaultBalanceSheet(vaultInstance.address, strategyInstance.address);
    }

    async function redeemShares() {
      let vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
      let strategyInstance = await hre.ethers.getContractAt("DaiStrategy", strategyContract);
      const userShareTokenBalance = await vaultInstance.balanceOf(
        deployer.address
      );
      console.log(
        "userSharetoken",
        hre.ethers.utils.formatUnits(userShareTokenBalance.toString())
      );
      const userEarningsOnShare = await vaultInstance.previewRedeem(
        userShareTokenBalance
      );
      console.log(
        "userEarningsOnShare",
        hre.ethers.utils.formatUnits(userEarningsOnShare.toString())
      );
      await vaultInstance.redeem(
        userShareTokenBalance,
        deployer.address,
        deployer.address
      ); // amount, to, from
      await checkSingleBalance(deployer, vaultInstance.address);
      await vaultBalanceSheet( vaultInstance.address, strategyInstance.address);
    }

  await deploySquid();
  await deployVault();
  await deployStrategy();
  await setStrategy();
  await depositUnderlyingToVault();
  await callEarnOnVault();
  await callHarvestFromStrat();
  await redeemShares();

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
