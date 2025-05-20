import { PrivyProvider } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      clientId={import.meta.env.VITE_CLIENT_ID}
      config={{
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}