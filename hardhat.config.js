require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/btBsEUKXY_bxQ4MM8fP20Nu0_rUkuoHz",
      accounts: ["68d36272159f0488beb8c7ed57b57cd3f9761f4d4edd5cc89930b7ea313d510d"],
    },
  },
  etherscan: {
    apiKey: "MZTCGPGTRA44U7S1Y231HWKHZBBSGU3C93",
  },
  solidity: "0.8.8",
};
