import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Input, FileUpload } from '../components/common/FormComponent';

const initialState = {
  first_name: '',
  last_name: '',
  address: {
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    house_no: '',
  },
  phone: '',
  email_address: '',
  identity: {
    id_type: '',
    id_no: '',
    bvn: '',
    id_image: '',
    selfie_image: '',
    country: '',
  },
  meta_data: {},
};

interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  house_no: string;
}

interface Identity {
  id_type: string;
  id_no: string;
  bvn: string;
  id_image: string;
  selfie_image: string;
  country: 'IN' | string;
}

interface FormDataState {
  first_name: string;
  last_name: string;
  address: Address;
  phone: string;
  email_address: string;
  identity: Identity;
  meta_data: Record<string, unknown>;
}

const CardHolder = () => {
  const [formData, setFormData] = useState<FormDataState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (file: File | null, fieldName: string) => {
    setFormData({
      ...formData,
      identity: {
        ...formData.identity,
        [fieldName]: file ? URL.createObjectURL(file) : '',
      },
    });
  };

  console.log(formData);

  return (
    <main className='between between min-h-screen w-screen flex-col gap-3 overflow-y-scroll bg-black px-3 py-5 pb-[5rem] text-white'>
      <div className='between w-full border-b border-gray-700 pb-3'>
        <Link to='/profile' className='center gap-2'>
          <IoIosArrowBack color='#fff' size={15} />
          <p className='font-light text-sm'>Back</p>
        </Link>
        <div className='text-center font-light text-sm capitalize'>
          Card Holder
        </div>
      </div>
      <Input
        onChange={handleChange}
        value={formData.first_name}
        type='text'
        label='First name'
        placeholder='John'
        name='first_name'
      />
      <Input
        onChange={handleChange}
        value={formData.last_name}
        type='text'
        label='Last name'
        placeholder='Doe'
        name='last_name'
      />
      <Input
        onChange={handleChange}
        value={formData.address.address}
        type='text'
        label='Address'
        placeholder='No. 123, Atiku street'
        name='address'
      />
      <div className='between gap-4'>
        <Input
          onChange={handleChange}
          value={formData.address.city}
          type='text'
          label='City'
          placeholder='Uyo'
          name='city'
        />

        <Input
          onChange={handleChange}
          value={formData.address.state}
          type='text'
          label='State'
          placeholder='Akwa Ibom'
          name='state'
        />
      </div>

      <Input
        onChange={handleChange}
        value={formData.address.country}
        type='text'
        label='Country'
        placeholder='Nigeria'
        name='country'
      />

      <div className='between gap-4'>
        <Input
          onChange={handleChange}
          value={formData.address.postal_code}
          type='text'
          label='Postal code'
          placeholder='111222'
          name='postal_code'
        />

        <Input
          onChange={handleChange}
          value={formData.address.house_no}
          type='text'
          label='House number'
          placeholder='22'
          name='house_no'
        />
      </div>

      <Input
        onChange={handleChange}
        value={formData.phone}
        type='phone'
        label='Phone number'
        placeholder='+23470938174482'
        name='email_address'
      />

      <Input
        onChange={handleChange}
        value={formData.email_address}
        type='email'
        label='Email address'
        placeholder='john1234@gmail.com'
        name='email_address'
      />

      <Input
        onChange={handleChange}
        value={formData.identity.id_type}
        type='text'
        label='Identity type'
        placeholder='National ID card'
        name='id_type'
      />

      <Input
        onChange={handleChange}
        value={formData.identity.id_no}
        type='text'
        label='Identity number'
        placeholder='1234567890'
        name='id_no'
      />

      <Input
        onChange={handleChange}
        value={formData.identity.bvn}
        type='text'
        label='BVN'
        placeholder='12345678901'
        name='bvn'
      />
      <div className='flex w-full flex-col gap-2'>
        <p className='text-sm text-gray-400'>ID image</p>
        <FileUpload
          image={formData.identity.id_image}
          handleFileChange={(file: File) => handleFileChange(file, 'id_image')}
        />
      </div>
      <div className='flex w-full flex-col gap-2'>
        <p className='text-sm text-gray-400'>Selfie image</p>
        <FileUpload
          image={formData.identity.selfie_image}
          handleFileChange={(file: File) =>
            handleFileChange(file, 'selfie_image')
          }
        />
      </div>
      <Input
        onChange={handleChange}
        value={formData.identity.country}
        type='text'
        label='Country'
        placeholder='Nigeria'
        name='country'
      />

      <Link
        to='/cardHolder'
        className='center mt-[3rem] w-full rounded-lg bg-white p-3 font-semibold text-black'
      >
        Confirm
      </Link>
    </main>
  );
};

export default CardHolder;
