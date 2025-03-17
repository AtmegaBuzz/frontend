import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";

import { Network } from '@aptos-labs/ts-sdk';

export const WalletProvider = ({ children }: PropsWithChildren) => {

  return (
    <AptosWalletAdapterProvider
      optInWallets={["Petra", "Continue with Google", "Mizu Wallet", "T wallet", "Pontem Wallet", "Nightly"]}
      autoConnect={true}
      dappConfig={{ network: Network.DEVNET }}
      onError={(error) => {
        console.log("error", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};