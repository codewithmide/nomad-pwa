import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

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
    <div className="flex h-full flex-col py-6 items-center">
      <div className="w-[65%] h-[60%] flex flex-col items-center justify-center rounded-lg">
        <div className="w-full h-[90%] flex flex-col items-center justify-between rounded-xl bg-[#FFC0CB] p-3 px-4">
          <div className="flex w-full justify-between items-center bg-[#FFC0CB]">
            <p className="text-2xl font-bold text-black">nomad</p>
            <p className="text-black">Virtual</p>
          </div>
          <p className="text-md w-full text-black">{user?.firstName}{" "}{user?.lastName}</p>
          <div className="flex flex-col w-full gap-4 items-start">
            <p className="text-black text-lg font-semibold">1234  2345  6742  6221</p>
            <div className="flex flex-row items-start gap-10">
              <div className="flex gap-2 flex-col">
                <p className="text-black font-medium">EXP</p>
                <p className="text-black font-medium">02/26</p>
              </div>
              <div className="flex bg-[#FFC0CB] gap-2 flex-col">
                <p className="text-black font-medium">CVV</p>
                <p className="text-black font-medium">226</p>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center ">
            <p className="text-black font-light"></p>
            <p className="text-xl font-semibold text-black">scalex</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between items-center flex-col gap-1 my-4">
        <p className="text-xl leading-none">Virtual card</p>
        <div className="flex gap-1 items-center justify-center flex-row">
          <div className="w-[10px] h-[10px] bg-[#00ff00] rounded-full"></div>
          <p className="font-light">active</p>
        </div>
      </div>
      <div className="w-[90%] h-[100px] mt-6 flex flex-row items-center justify-between bg-white font-bold rounded-lg px-6">
        <p className="text-md text-black">
          Current Balance
        </p>
        <p className="text-lg text-black">${balance}.00</p>
      </div>
    </div>
  );
}
