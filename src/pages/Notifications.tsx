import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Notifications = () => {
  return (
    <main className='h-screen w-screen overflow-hidden bg-black p-5 text-white'>
      <div className='between w-full border-b border-gray-700 pb-3'>
        <Link to='/' className='center gap-2'>
          <IoIosArrowBack color='#fff' size={15} />
          <p className='font-light text-sm'>Back</p>
        </Link>
      </div>
      <p className='mt-10 text-2xl'>Notifications</p>
      <div className='overflow-y-auto'>
        <p className='mt-4 w-full text-left font-regular text-[.7rem]'>
          You currently have no notificaation
        </p>
      </div>
    </main>
  );
};

export default Notifications;
