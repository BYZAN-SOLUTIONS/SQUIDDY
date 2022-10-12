const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("squiddyVault", function () {
  let sCoreContract;
  let manager;

  beforeEach(async function () {
    [manager] = await ethers.getSigners();
    const squiddyVault = await ethers.getContractFactory("SquiddyCore");
    sCoreContract = await squiddyVault.deploy();
    await squiddyVault.deployed();
  });
  it("Checks that Vault instance has a manager", async function () {
    expect(await squiddyVault._manager).to.equal(manager.address);
    console.log("Manager address: ", manager.address);    
  });
});
