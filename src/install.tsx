import React, { useState, useEffect } from 'react';

const InstallPWA: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e); 
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  return (
    installPrompt && (
      <button onClick={handleInstallClick} id="installButton" className='mt-[5rem] bg-white absolute bottom-10 right-10 px-6 text-black p-3 rounded-lg font-semibold'>
        Install
      </button>
    )
  );
};

export default InstallPWA;
