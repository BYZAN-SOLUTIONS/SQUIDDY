require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // goerli: {
    // url: ` https://goerli.infura.io/v3${process.env.PROJECT_ID}`,
    // accounts: [process.env.PRIVATE_KEY],
    // },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: process.env.ETHERSCAN_API
  },
  solidity: "0.8.9",
};
