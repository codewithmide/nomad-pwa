import { useEffect, useState } from 'react';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Tranasctions() {
  const { primaryWallet } = useDynamicContext();

  const [balance, setBalance] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.connector.getBalance();
        setBalance(String(value));
      }
    };
    fetchBalance();
  }, [primaryWallet]);

  return (
    <main className='h-screen w-screen bg-black p-4 pb-[4rem] text-white'>
      <div className='mt-3 flex w-full flex-col items-start font-regular'>
        <p>Current balance</p>
        <h2 className='font-bold text-4xl'>${balance}.00</h2>
      </div>
      <div className='center mt-[5rem] w-full flex-col '>
        <div className='between w-full'>
          <h3 className='font-medium'>Tranasctions</h3>
          {/* <p className='text-gray-400 font-light text-sm'>all</p> */}
        </div>
        <div className='mt-8 w-full text-left font-regular text-sm'>
          You currently have no tranasction
        </div>
      </div>
    </main>
  );
}
