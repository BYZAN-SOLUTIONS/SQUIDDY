// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function deployContract(req, res) {
  console.log("deployContract", req.body);
  const { name, symbol, signer } = req.body;
  const hre = require("hardhat");
  const fs = require("fs");
  const privKey = "<PK HERE>";

  // Deploy the contract to Ethereum test network - goerli
  const provider = hre.ethers.providers.getDefaultProvider("rinkeby");

  // Use your wallet's private key to deploy the contract
  const privateKey = privKey;
  const wallet = new hre.ethers.Wallet(privateKey, provider);
  const path = `artifacts/contracts/CustomERC721.sol/CustomERC721.json`;

  // Read the contract artifact
  const metadata = JSON.parse(fs.readFileSync(path).toString());

  // Set gas limit and gas price, using the default goerli provider
  const price = hre.ethers.utils.formatUnits(
    await provider.getGasPrice(),
    "gwei"
  );
  const options = {
    gasLimit: 800000,
    gasPrice: hre.ethers.utils.parseUnits(price, "gwei"),
  };

  // Deploy the contract
  const factory = new hre.ethers.ContractFactory(
    metadata.abi,
    metadata.bytecode,
    signer
  );
  const contract = await factory.deploy(`${name}, ${symbol}`, options);
  await contract.deployed();
  console.log(`Deployment successful! Contract Address: ${contract.address}`);

  // return contract
  res.json({
    contractAddress: contract.address,
  });
}
