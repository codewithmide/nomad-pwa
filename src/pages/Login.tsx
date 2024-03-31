import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Logo from '../components/common/Logo';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const { primaryWallet, user } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet !== null || user) {
      navigate('/home');
    }
  }, [primaryWallet, user, navigate]);

  return (
    <main className='between h-screen w-screen flex-col bg-black p-4 text-white'>
      <div className='flex w-full items-start'>
        <Logo />
      </div>
      <div className='center flex-col gap-4'>
        <h2 className='text-center font-regular text-lg '>
          Please create an account or login to continue
        </h2>
        <DynamicWidget innerButtonComponent={<button>Login to nomad</button>} />
      </div>
      <div></div>
    </main>
  );
};
