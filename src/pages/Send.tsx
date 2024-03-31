import React, { useState } from 'react';
import { IoIosArrowBack, IoIosSend, IoIosBackspace } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Send = () => {
  const [displayAmount, setDisplayAmount] = useState('0.00');
  const [numericAmount, setNumericAmount] = useState(0);

  const updateAmount = (newAmount: React.SetStateAction<number>) => {
    if (Number(newAmount) <= 999999.99) {
      setNumericAmount(newAmount);
      setDisplayAmount(
        newAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  };

  const handleNumberClick = (number: string) => {
    let newAmount = numericAmount * 10 + Number(number);
    if (!Number.isInteger(numericAmount)) {
      newAmount = parseFloat(numericAmount.toString() + number);
    }
    updateAmount(newAmount);
  };

  const handleDelete = () => {
    const newAmount = Math.floor(numericAmount / 10);
    updateAmount(newAmount);
  };

  console.log(numericAmount);
  console.log(displayAmount);

  return (
    <div className='between between h-screen w-screen flex-col bg-black px-3 py-5 pb-[4rem] text-white'>
      <div className='between w-full border-b border-gray-700 pb-3'>
        <Link to='/' className='center gap-2'>
          <IoIosArrowBack color='#fff' size={15} />
          <p className='font-light text-sm'>Back</p>
        </Link>
        <div className='text-center font-light text-sm capitalize'>
          Send Money
        </div>
      </div>

      <div className='center between h-full w-full flex-col pb-6'>
        <div></div>
        <p className='font-bold text-4xl'>
          <span className='font-bold text-3xl'>$</span>
          {displayAmount}
        </p>
        <Link
          to='/send'
          className='center rounded- w-full gap-2 bg-white p-5 text-center font-medium text-black'
        >
          <p className='text-2xl'>Send</p>
          <IoIosSend size={20} />
        </Link>
      </div>

      {/* Numbered keyboard here */}
      <div className='grid w-full grid-cols-3  gap-2 rounded-t-sm p-4 font-medium text-3xl text-white'>
        {[...Array(9).keys()].map((n) => (
          <button
            key={n + 1}
            onClick={() => handleNumberClick((n + 1).toString())}
            className=' rounded-md p-5'
          >
            {n + 1}
          </button>
        ))}
        <button></button>
        <button
          onClick={() => handleNumberClick('0')}
          className='rounded-md p-3'
        >
          0
        </button>
        <button onClick={handleDelete} className=' center rounded-md p-3'>
          <IoIosBackspace size={24} />
        </button>
      </div>
    </div>
  );
};

export default Send;
