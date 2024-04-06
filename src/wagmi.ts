import {
  http,
  createConfig,
  configureChains,
  defaultChains,
  infuraProvider,
} from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  walletConnect,
  WalletConnectConnector,
} from "wagmi/connectors";
// import { infuraProvider } from "wagmi/providers";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const getEnvVars = () => ({
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
});
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    // coinbaseWallet({
    //   appName: "Foundation Takehome",
    //   chainId: mainnet.id,
    //   darkMode: true,
    //   enableMobileWalletLink: true,
    // }),
    walletConnect({
      projectId: getEnvVars().projectId,
      qrModalOptions: {
        themeMode: "light",
      },
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
