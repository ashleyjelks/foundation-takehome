import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const getEnvVars = () => ({
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
});

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
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
