import React, { useState } from 'react';
import { IoIosArrowBack, IoIosSend, IoIosBackspace } from "react-icons/io";
import { Link } from "react-router-dom";

const Send = () => {
  const [displayAmount, setDisplayAmount] = useState('0.00');
  const [numericAmount, setNumericAmount] = useState(0);

  const updateAmount = (newAmount: React.SetStateAction<number>) => {
    if (Number(newAmount) <= 999999.99) {
      setNumericAmount(newAmount);
      setDisplayAmount(newAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
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
    <div className="bg-black flex-col pb-[4rem] between text-white h-screen w-screen between px-3 py-5">
      <div className="w-full between border-b pb-3 border-gray-700">
        <Link to="/" className="center gap-2">
            <IoIosArrowBack color="#fff" size={15}/>
            <p className='text-sm font-light'>Back</p>
        </Link>
        <div className="capitalize font-light text-sm text-center">Send Money</div>
      </div>

      <div className="w-full h-full pb-6 center flex-col between">
        <div></div>
        <p className="text-4xl font-bold"><span className="text-3xl font-bold">$</span>{displayAmount}</p>
        <Link to="/send" className='w-full center gap-2 text-center bg-white text-black p-5 rounded- font-medium'>
          <p className="text-2xl">Send</p>
          <IoIosSend size={20} />
        </Link>
      </div>

      {/* Numbered keyboard here */}
      <div className="grid grid-cols-3 gap-2  text-white font-medium w-full rounded-t-sm p-4 text-3xl">
        {[...Array(9).keys()].map(n =>
          <button key={n+1} onClick={() => handleNumberClick((n+1).toString())} className=" p-5 rounded-md">
            {n + 1}
          </button>
        )}
        <button></button>
        <button onClick={() => handleNumberClick('0')} className="p-3 rounded-md">0</button>
        <button onClick={handleDelete} className=" center p-3 rounded-md">
          <IoIosBackspace size={24}/>
        </button>
      </div>
    </div>
  );
};

export default Send;
