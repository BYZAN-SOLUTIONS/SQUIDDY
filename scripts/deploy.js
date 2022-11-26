// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const SquiddyCore = await hre.ethers.getContractFactory("SquiddyCore");
  const VaultFactory = await hre.ethers.getContractFactory("VaultFactory");

  // Deploy SquiddyCore
  const squiddyCore = await SquiddyCore.deploy();
  await squiddyCore.deployed();
  console.log("SquiddyCore deployed to:", squiddyCore.address);

  // Deploy VaultFactory
  const vaultFactory = await VaultFactory.deploy(squiddyCore.address);
  await vaultFactory.deployed();
  console.log("VaultFactory deployed to:", vaultFactory.address);

  // squiddyCore.grantRole(
  //   await squiddyCore.VAULT_FACTORY_ROLE(),
  //   vaultFactory.address
  // );

  // const hasRole = await squiddyCore.hasRole(
  //   await vaultFactory.VAULT_FACTORY_ROLE(),
  //   vaultFactory.address
  // );

  // console.log(`VaultFactory has VAULT_FACTORY_ROLE: ${hasRole}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
