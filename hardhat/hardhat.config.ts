import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";

require("dotenv").config();
const { MNEMONIC, PROJECT_ID, PRIVATE_KEY, INFURA_ID } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "MATIC",
    gasPrice: 100,
    coinmarketcap: "b88d1579-a2d9-46c5-8ffa-9ba45f41f774",
  },
  networks: {
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY],
    // },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${PROJECT_ID}`,
      // `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`,
      accounts: [PRIVATE_KEY],
      chainId: 80001,

      // provider: () =>
      //   new HDWalletProvider(
      //     MNEMONIC,
      //     `https://polygon-mumbai.g.alchemy.com/v2/${PROJECT_ID}`
      //   ),
      // network_id: 80001, // Goerli's id
      // confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      // timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
};

export default config;
