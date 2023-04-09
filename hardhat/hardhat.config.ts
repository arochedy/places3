import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";

require("dotenv").config();
const {  PROJECT_ID, PRIVATE_KEY } = process.env;

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
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
  },
};

export default config;
