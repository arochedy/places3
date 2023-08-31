import { configureChains, createClient } from "wagmi";
import { goerli, mainnet, localhost, polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { publicProvider } from "wagmi/providers/public";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai, ...(import.meta.env?.MODE === "development" ? [] : [])],
  [publicProvider()]
);

const connector = new WalletConnectConnector({
  options: {
    projectId: process.env.WALLETCONNECT_PROJECT_ID,
    showQrModal: true,
  },
});

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    connector,
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,

  webSocketProvider,
});
