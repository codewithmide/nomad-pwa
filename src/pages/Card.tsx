import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/common/FormComponent';
import { IoIosArrowBack } from 'react-icons/io';

interface MetaData {
  [key: string]: any;
}

interface CardFormData {
  card_type: string;
  card_brand: string;
  card_currency: string;
  pin: string;
  meta_data: MetaData;
}

const initialState: CardFormData = {
  card_type: 'Virtual',
  card_brand: '',
  card_currency: '',
  pin: '',
  meta_data: {},
};

const Card = () => {
  const [formData, setFormData] = useState<CardFormData>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

    console.log(formData);

  return (
    <main className='between min-h-screen w-screen flex-col gap-3 overflow-y-scroll bg-black px-3 py-5 pb-[5rem] text-white'>
      <div className='flex w-full flex-col gap-6'>
        <div className='between w-full border-b border-gray-700 pb-3'>
          <Link to='/wallet' className='center gap-2'>
            <IoIosArrowBack color='#fff' size={15} />
            <p className='font-light text-sm'>Back</p>
          </Link>
          <div className='text-center font-light text-sm capitalize'>
            Create card
          </div>
        </div>
        <div className='center w-full flex-col gap-3'>
          <Input
            onChange={handleChange}
            value={formData.card_type}
            type='text'
            label='Card Type'
            placeholder='Virtual'
            name='card_type'
          />
          

          <div className='w-full'>
            <label htmlFor="card_brand" className='block mb-2 font-medium text-sm text-gray-400'>Card Brand</label>
            <select
              id="card_brand"
              name="card_brand"
              onChange={handleChange}
              value={formData.card_brand}
              className="block w-full p-3 border border-gray-800 bg-black text-sm text-gray-200 rounded shadow-sm focus:outline-none focus:none focus:none"
            >
              <option value="" disabled>Select your preferred card brand</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Visa">Visa</option>
            </select>
          </div>

          <Input
            onChange={handleChange}
            value={formData.card_currency}
            type='text'
            label='Card Currency'
            placeholder='NGN'
            name='card_currency'
          />

          <Input
            onChange={handleChange}
            value={formData.pin}
            type='password'
            label='PIN'
            placeholder='****'
            name='pin'
          />
        </div>
      </div>

      <Link
        to='/wallet'
        className='center mt-[3rem] w-full rounded-lg bg-white p-3 font-semibold text-black'
      >
        Submit
      </Link>
    </main>
  );
};

export default Card;
