import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function WalletPage() {
  const { primaryWallet } = useDynamicContext();
  const [card] = useLocalStorage<Card>('card');

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
    <div className='flex h-screen w-screen flex-col items-center bg-black py-6 pb-[5rem] text-white'>
      {card && (
        <div className='flex h-[60%] w-[65%] flex-col items-center justify-center rounded-lg'>
          <div
            style={{
              backgroundImage: 'url("card.svg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className='flex h-[90%] w-full flex-col items-center justify-between rounded-lg p-3 px-4'
          >
            <div className='flex w-full items-center justify-between'>
              <p className='font-medium text-2xl text-black'>nomad</p>
              <p className='text-black'>Virtual</p>
            </div>
            <p className='text-md w-full font-regular text-black'>
              {card.card_name}
            </p>
            <div className='flex w-full flex-col items-start gap-4'>
              <p className='font-medium text-lg text-black'>
                {card.card_number?.replace(/(\d{4})/g, '$1 ')}
              </p>
              <div className='flex flex-row items-start gap-10'>
                <div className='flex flex-col gap-2'>
                  <p className='font-medium text-black'>EXP</p>
                  <p className='font-medium text-black'>{card.expiry_date}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='font-medium text-black'>CVV</p>
                  <p className='font-medium text-black'>***</p>
                </div>
              </div>
            </div>
            <div className='flex w-full items-center justify-between '>
              <p className='font-light text-black'></p>
            </div>
          </div>
        </div>
      )}
      <div className='my-4 flex w-full flex-col items-center justify-between gap-1'>
        <p className='font-regular text-xl leading-none'>Virtual card</p>
        <div className='flex flex-row items-center justify-center gap-1'>
          <div className='h-[10px] w-[10px] rounded-full bg-[#00ff00]'></div>
          <p className='font-light'>active</p>
        </div>
      </div>
      <div className='mt-6 flex h-[100px] w-[90%] flex-row items-center justify-between rounded-sm bg-white px-6 font-bold'>
        <p className='text-md font-medium text-black'>Current Balance</p>
        <p className='font-medium text-lg text-black'>${balance}.00</p>
      </div>
      {!card && (
        <Link
          to='/create-card'
          className='center mt-[1rem] w-[90%] bg-white p-3 font-semibold text-black'
        >
          Create Card
        </Link>
      )}
    </div>
  );
}
