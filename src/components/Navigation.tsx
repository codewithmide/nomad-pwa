import React from 'react';
import Home from '../pages/Home';
import WalletPage from '../pages/Wallet';
import Profile from '../pages/Profile';
import { RiHome2Line } from "react-icons/ri";
import { LuWallet2 } from "react-icons/lu";
import { FiSend } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { CiCreditCard2 } from "react-icons/ci";
import Transactions from "../pages/Transactions";

function Navigation() {
  const [currentScreen, setCurrentScreen] = React.useState<number>(0);

  const Screens = [
    <Home />,
    <WalletPage />,
    <Transactions />,
    <Profile />,
  ];

  const getTabClass = (index: number) => {
    return `flex-col gap-1 p-2 rounded-lg center text-[.7rem] w-[25%] ${currentScreen === index ? 'bg-black text-white' : 'bg-white text-black'}`;
  };

  const getIconColor = (index: number) => {
    return currentScreen === index ? 'white' : 'black';
  };

  return (
    <div className='h-screen w-screen font-regular overflow-hidden bg-black text-white'>
      {Screens[currentScreen]}
      <div className='w-screen fixed left-0 z-50 bottom-0'>
        <div className='flex items-center justify-around bg-white p-1'>
          <div onClick={() => setCurrentScreen(0)} className={getTabClass(0)}>
            <RiHome2Line size={20} color={getIconColor(0)} />
            <p>Home</p>
          </div>
          <div onClick={() => setCurrentScreen(1)} className={getTabClass(1)}>
            <CiCreditCard2 size={23} color={getIconColor(1)} />
            <p>Card</p>
          </div>
          <div onClick={() => setCurrentScreen(2)} className={getTabClass(2)}>
            <FiSend size={20} color={getIconColor(2)} />
            <p>Transactions</p>
          </div>
          <div onClick={() => setCurrentScreen(3)} className={getTabClass(3)}>
            <FaRegUser size={20} color={getIconColor(3)} />
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
