import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Link } from 'react-router-dom';

export default function WalletPage() {
  const {
    user,
    primaryWallet } = useDynamicContext();

  const [balance, setBalance] = useState("");

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
    <div className="flex pb-[5rem] h-screen w-screen bg-black text-white flex-col py-6 items-center">
      <div className="w-[65%] h-[60%] flex flex-col items-center justify-center rounded-lg">
        <div style={{ backgroundImage: 'url("card.svg")', backgroundSize: 'cover',
        backgroundPosition: 'center'}} className="w-full h-[90%] flex flex-col items-center justify-between rounded-lg p-3 px-4">
          <div className="flex w-full justify-between items-center">
            <p className="text-2xl font-medium text-black">nomad</p>
            <p className="text-black">Virtual</p>
          </div>
          <p className="text-md w-full font-regular text-black">{user?.firstName}{" "}{user?.lastName}</p>
          <div className="flex flex-col w-full gap-4 items-start">
            <p className="text-black text-lg font-medium">1234  2345  6742  6221</p>
            <div className="flex flex-row items-start gap-10">
              <div className="flex gap-2 flex-col">
                <p className="text-black font-medium">EXP</p>
                <p className="text-black font-medium">02/26</p>
              </div>
              <div className="flex gap-2 flex-col">
                <p className="text-black font-medium">CVV</p>
                <p className="text-black font-medium">226</p>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center ">
            <p className="text-black font-light"></p>
        
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between items-center flex-col gap-1 my-4">
        <p className="text-xl font-regular leading-none">Virtual card</p>
        <div className="flex gap-1 items-center justify-center flex-row">
          <div className="w-[10px] h-[10px] bg-[#00ff00] rounded-full"></div>
          <p className="font-light">active</p>
        </div>
      </div>
      <div className="w-[90%] h-[100px] mt-6 flex flex-row items-center justify-between bg-white font-bold rounded-sm px-6">
        <p className="text-md font-medium text-black">
          Current Balance
        </p>
        <p className="text-lg font-medium text-black">${balance}.00</p>
      </div>
      <Link to="/card" className='w-[90%] center mt-[1rem] bg-white text-black p-3 font-semibold'>
        Create Card
      </Link>
    </div>
  );
}
