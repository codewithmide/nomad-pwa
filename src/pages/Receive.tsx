import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from '../components/CopyToClipboard';
import { useUserWallets } from '@dynamic-labs/sdk-react-core';

const Receive = () => {
  const userWallets = useUserWallets();

  return (
    <div className='between between h-screen w-screen flex-col bg-black px-3 py-5 text-white'>
      <div className='between w-full border-b border-gray-700 pb-3'>
        <Link to='/' className='center gap-2'>
          <IoIosArrowBack color='#fff' size={15} />
          <p className='font-light text-sm'>Back</p>
        </Link>
        <div className='text-center font-light text-sm capitalize'>
          Receive Money
        </div>
      </div>

      <div className='center w-10/12 flex-col gap-4'>
        <h2 className='text-center font-medium text-3xl'>
          Receive money into your Nomad wallet
        </h2>
        <p className='text-center font-regular text-sm'>
          Scan this QR code or copy your wallet address below to receive money
        </p>
      </div>

      <div className='center size-[200px] border border-white'>
        qr code here
      </div>

      <div className='w-11/12 text-wrap rounded-sm bg-white text-black'>
        <div className='between gap-3 rounded-sm p-3'>
          <div
            id='ref'
            className='overflow-hidden text-ellipsis whitespace-nowrap text-[.7rem]'
          >
            {userWallets.map((wallet) => (
              <p className='font-regular' key={wallet.id}>
                {wallet.address}
              </p>
            ))}
          </div>
          <CopyToClipboard targetId='ref' />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Receive;
