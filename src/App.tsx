import { useState, useEffect, useMemo } from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { Toaster } from 'sonner';
import RouteFile from './routes';
import InstallPWA from './install';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = useMemo(() => windowWidth < 768, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: '8c3a7ed4-bb69-4baa-9883-3111947ee06c',
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <Toaster position='top-center' />
      {isMobile ? (
        <main className='quicksand'>
          <RouteFile />
          <InstallPWA />
        </main>
      ) : (
        <div className='quicksand center h-screen w-screen font-bold text-3xl text-black'>
          Nomad is only available on mobile devices.
        </div>
      )}
    </DynamicContextProvider>
  );
}

export default App;
