const  hre = require("hardhat");

async function checkUserBalances(signers, vaultContract) {
  let _vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
  for (let i = 0; i <= signers.slice(0, 3).length; i++) {
    const vaultInstance = await _vaultInstance.connect(signers[i]);
    const userUnderlyingInVault = await vaultInstance.assetsOf(
      signers[i].address
    );
    const userSharesFromUnderlying = await vaultInstance.previewRedeem(
      userUnderlyingInVault
    );
    const totalUnderlyingInVault = await vaultInstance.totalAssets();
    const availableInVaultOutsideStrat = await vaultInstance.freeFloat();
    const result =
      "totalAssets()" +
      ethers.utils.formatUnits(totalUnderlyingInVault) +
      " freeFloat(): " +
      ethers.utils.formatUnits(availableInVaultOutsideStrat) +
      " user underlyingInVault: " +
      ethers.utils.formatUnits(userUnderlyingInVault.toString()) +
      " user sharesFromUnderlying: " +
      ethers.utils.formatUnits(userSharesFromUnderlying.toString());
    console.log(result);
  }
}

 async function checkSingleBalance(signer, vaultContract) {
  const _vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
  const vaultInstance = _vaultInstance.connect(signer);
  const userUnderlyingInVault = await vaultInstance.assetsOf(signer.address);
  const userSharesFromUnderlying = await vaultInstance.previewRedeem(
    userUnderlyingInVault
  );
  const totalUnderlyingInVault = await vaultInstance.totalAssets();
  const availableInVaultOutsideStrat = await vaultInstance.freeFloat();
  const result =
    "totalAssets()" +
    hre.ethers.utils.formatUnits(totalUnderlyingInVault) +
    " freeFloat(): " +
    hre.ethers.utils.formatUnits(availableInVaultOutsideStrat) +
    " user underlyingInVault: " +
    hre.ethers.utils.formatUnits(userUnderlyingInVault.toString()) +
    " user sharesFromUnderlying: " +
    hre.ethers.utils.formatUnits(userSharesFromUnderlying.toString());
  console.log(result);
}

async function vaultBalanceSheet(vaultContract, strategyContract) {
  const vaultInstance = await hre.ethers.getContractAt("Vault", vaultContract);
  let strategyInstance = await hre.ethers.getContractAt("DaiStrategy", strategyContract);
  const balance = await vaultInstance.totalAssets();
  console.log("totalAssets():", hre.ethers.utils.formatUnits(balance.toString()));

  const availableInVaultOutsideStrat = await vaultInstance.idleFloat();
  console.log(
    "idleFloat():",
    hre.ethers.utils.formatUnits(availableInVaultOutsideStrat.toString())
  );

  const availableToDepositIntoStrategy = await vaultInstance.freeFloat();
  console.log(
    "freeFloat():",
    hre.ethers.utils.formatUnits(availableToDepositIntoStrategy.toString())
  );

  const balanceOf = await strategyInstance.balanceOf();
  console.log(
    "strategy balanceOf:",
    hre.ethers.utils.formatUnits(balanceOf.toString())
  );

  const balanceC = await strategyInstance.balanceC();
  console.log(
    "strategy balanceC:",
    hre.ethers.utils.formatUnits(balanceC.toString())
  );

  const balanceCInToken = await strategyInstance.balanceCInToken();
  console.log(
    "strategy balanceCInToken:",
    hre.ethers.utils.formatUnits(balanceCInToken.toString())
  );
}

async function mineBlocks() {
  for (let index = 0; index < 10; index++) {
    console.log("mining block", index);
    await hre.ethers.provider.send("evm_mine", []);
  }
}

module.exports = {
  checkUserBalances,
  checkSingleBalance,
  vaultBalanceSheet,
  mineBlocks,
};
