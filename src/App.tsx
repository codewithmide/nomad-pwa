import { useState, useEffect } from 'react';
import {
  DynamicContextProvider
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import RouteFile from "./routes";
import InstallPWA from "./install";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth < 768;

  return (
    <DynamicContextProvider
      settings={{
        environmentId: '8c3a7ed4-bb69-4baa-9883-3111947ee06c',
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      {isMobile ? (
        <main className="quicksand">
          <RouteFile />
          <InstallPWA />
        </main>
      ) : (
        <div className="quicksand w-screen h-screen text-black font-bold text-3xl center">
          Nomad is only available on mobile devices.
        </div>
      )}
    </DynamicContextProvider>
  );
}

export default App;
