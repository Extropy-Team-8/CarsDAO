require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.6",
  networks: {
    avalancheTest: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      gas: 3000000,
      chainId: 43113,
      accounts: [process.env.PRIV_KEY],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIV_KEY],
      gasPrice: 12000000000,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_KEY,
    },
  },
  settings: {
    optimizer: {
      runs: 200,
      enabled: true,
    },
  },
};
