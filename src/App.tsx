import {
  DynamicContextProvider
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import RouteFile from "./routes";
import InstallPWA from "./install";

function App() {

  return (
    <DynamicContextProvider
      settings={{
        environmentId: '8c3a7ed4-bb69-4baa-9883-3111947ee06c',
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <main className="quicksand md:flex lg:hidden">
        <RouteFile />
        <InstallPWA />
      </main>
    </DynamicContextProvider>
  );
}

export default App;