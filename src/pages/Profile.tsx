import { useDynamicContext, useUserWallets } from '@dynamic-labs/sdk-react-core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const {
    user,
    handleLogOut,
    primaryWallet } = useDynamicContext();
  const userWallets = useUserWallets();

  const [balance, setBalance] = useState("");

  if (userWallets.length === 0) {
    return <div>No connected wallets.</div>;
  }

  const logOutAndRedirect = async () => {
    await handleLogOut();
    navigate('/');
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

  return (
    <main className="min-h-screen w-screen flex-col flex bg-black p-5 text-white ">
      <div className="w-full capitalize font-regular text-center border-b pb-3 border-gray-700">My profile</div>
      <div className='flex-col flex center w-full my-14'>
        {user?.ens?.avatar ? (
          <img
            src={user.ens.avatar}
            style={{ width: '2rem', height: '2rem' }}
          />
        ) : (
          <div className='border border-gray-700 center rounded-full size-[6rem] mb-2'>
            <svg width="80" height="80" viewBox="0 0 19.2 19.2" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13.6 6.4a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 8 0" /><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16 16.8a6.4 6.4 0 1 0-12.8 0" /><path fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9.6 10.4a6.4 6.4 0 0 0-6.4 6.4H16a6.4 6.4 0 0 0-6.4-6.4" /></svg>
          </div>
        )}
        <p className='text-2xl'>{user?.firstName}{" "}{user?.lastName}</p>
        <p className='text-sm'>{user?.email}</p>
      </div>

      <div className='flex-col flex w-full center gap-2'>
        <p>Account balance</p>
        <h2 className='font-bold text-4xl'>${balance}.00</h2>
      </div>

      {/* <div className='flex-col flex w-full mt-8 gap-1'>
        <p className='text-[.7rem]'>Wallet address</p>
        {userWallets.map((wallet) => (
          <p key={wallet.id} className='text-[.7rem] bg-gray-800 font-semibold w-full p-1'>{wallet.address}</p>
        ))}
      </div> */}

      <button type="button" className='mt-[5rem] bg-white text-black p-3 rounded-lg font-semibold' onClick={logOutAndRedirect}>
        Log Out
      </button>
    </main>
  );
}