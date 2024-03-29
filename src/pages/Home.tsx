import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Logo from '../components/common/Logo';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  const { 
    user, 
    primaryWallet } = useDynamicContext();

  const [balance, setBalance] = useState("");

  // const primaryWalletAddress = primaryWallet?.address;

  // const connector = primaryWallet?.connector;

  const signMessage = async (primaryWallet: any) => {
    if (!primaryWallet) return null;
    else {
      console.log(primaryWallet.address);
    }

    const signer = await primaryWallet.connector.getSigner();

    return signer ? await signer.signMessage("example") : null;
  };


  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.connector.getBalance();
        setBalance(String(value));
      }
    };
    fetchBalance();
  }, [primaryWallet]);

  // console.log(user)

  return (
    <main className="h-screen w-screen flex-col flex bg-black p-5 text-white">
      <div className="w-full flex items-start"><Logo /></div>
      <div className='flex-col flex w-full items-start my-16'>
        <p>Hi <span>{user?.firstName}{" "}{user?.lastName}</span></p>
        <h1 className='font-bold text-3xl'>Welcome back</h1>
      </div>

      <div className='flex-col flex w-full items-start'>
        <p>Account balance</p>
        <h2 className='font-bold text-4xl'>${balance}.00</h2>
      </div>

      <button className='mt-[3rem] bg-white text-black p-3 rounded-lg font-semibold' onClick={() => signMessage(primaryWallet)}>Sign Message</button>
      <div className="w-full gap-6 between mt-[1rem]">
        <Link to="/send" className='w-full center gap-2 text-center bg-white text-black p-3 rounded-lg font-semibold'>
          <p>Send</p>
          {/* <IoIosSend size={20} /> */}
        </Link>
        <Link to="/receive" className='w-full text-center bg-white text-black p-3 rounded-lg font-semibold'>
          Recieve
        </Link>
      </div>

      <div className='center w-full flex-col mt-[6rem]'>
        <div className='between w-full'>
          <h3 className='font-semibold'>Recent tranasctions</h3>
          <Link to="/transactions" className='text-gray-400 text-sm'>show all</Link>
        </div>
        <div className='text-[.7rem] w-full text-left mt-4'>You currently have no tranasction</div>
      </div>
    </main>
  );
};
