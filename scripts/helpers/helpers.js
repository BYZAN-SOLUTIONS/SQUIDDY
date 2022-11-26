import { ethers } from "hardhat";

export async function checkUserBalances(signers, vaultContract) {
  for (let i = 0; i <= signers.slice(0, 3).length; i++) {
    const vaultInstance = vaultContract.connect(signers[i]);
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

export async function checkSingleBalance(signer, vaultContract) {
  const vaultInstance = vaultContract.connect(signer);
  const userUnderlyingInVault = await vaultInstance.assetsOf(signer.address);
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

export async function vaultBalanceSheet(vaultContract, strategyContract) {
  const balance = await vaultContract.totalAssets();
  console.log("totalAssets():", ethers.utils.formatUnits(balance.toString()));

  const availableInVaultOutsideStrat = await vaultContract.idleFloat();
  console.log(
    "idleFloat():",
    ethers.utils.formatUnits(availableInVaultOutsideStrat.toString())
  );

  const availableToDepositIntoStrategy = await vaultContract.freeFloat();
  console.log(
    "freeFloat():",
    ethers.utils.formatUnits(availableToDepositIntoStrategy.toString())
  );

  const balanceOf = await strategyContract.balanceOf();
  console.log(
    "strategy balanceOf:",
    ethers.utils.formatUnits(balanceOf.toString())
  );

  const balanceC = await strategyContract.balanceC();
  console.log(
    "strategy balanceC:",
    ethers.utils.formatUnits(balanceC.toString())
  );

  const balanceCInToken = await strategyContract.balanceCInToken();
  console.log(
    "strategy balanceCInToken:",
    ethers.utils.formatUnits(balanceCInToken.toString())
  );
}

export async function mineBlocks() {
  for (let index = 0; index < 10; index++) {
    console.log("mining block", index);
    await ethers.provider.send("evm_mine", []);
  }
}
