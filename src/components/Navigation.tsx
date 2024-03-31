import { useNavigate } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { CiCreditCard2 } from 'react-icons/ci';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

function Navigation() {
  const navigate = useNavigate();
  const { user, primaryWallet } = useDynamicContext();

  const getTabClass = (_index: number, path: string) => {
    const isActive = window.location.pathname === path;
    return `flex-col gap-1 p-2 rounded-lg center text-[.7rem] w-[25%] ${
      isActive ? 'bg-black text-white' : 'bg-white text-black'
    }`;
  };

  const getIconColor = (path: string) => {
    const isActive = window.location.pathname === path;
    return isActive ? 'white' : 'black';
  };

  if (!user && !primaryWallet) {
    return null;
  }

  return (
    <div className='overflow-hidden bg-black font-regular text-white'>
      <div className='fixed bottom-0 left-0 z-50 w-screen'>
        <div className='flex items-center justify-around bg-white p-1'>
          <div
            onClick={() => navigate('/home')}
            className={getTabClass(0, '/home')}
          >
            <RiHome2Line size={20} color={getIconColor('/home')} />
            <p>Home</p>
          </div>
          <div
            onClick={() => navigate('/wallet')}
            className={getTabClass(1, '/wallet')}
          >
            <CiCreditCard2 size={23} color={getIconColor('/wallet')} />
            <p>Card</p>
          </div>
          <div
            onClick={() => navigate('/transactions')}
            className={getTabClass(2, '/transactions')}
          >
            <FiSend size={20} color={getIconColor('/transactions')} />
            <p>Transactions</p>
          </div>
          <div
            onClick={() => navigate('/profile')}
            className={getTabClass(4, '/profile')}
          >
            <FaRegUser size={20} color={getIconColor('/profile')} />
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
