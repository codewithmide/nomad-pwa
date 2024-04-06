import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { toast } from 'sonner';
import { Input } from '../components/common/FormComponent';
import { handleNomadCardApiError } from '../helpers/axios';
import useNomadCardApiClient from '../hooks/use-nomad-card-api-client';
import useNomadCardUser from '../hooks/use-nomad-card-user';

interface CardFormData {
  card_type: string;
  card_brand: string;
  card_currency: string;
  pin: string;
}

const initialState: CardFormData = {
  card_type: 'Virtual',
  card_brand: 'Mastercard',
  card_currency: 'NGN',
  pin: '',
};

const Card = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CardFormData>(initialState);
  const nomadCardApiClient = useNomadCardApiClient();
  const nomadCardUser = useNomadCardUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading('Submitting...');

    try {
      await nomadCardApiClient.post('/card', formData);
      toast.success('Card created successfully', { id: toastId });
    } catch (error) {
      const message = handleNomadCardApiError(error);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (nomadCardUser.data?.cardId) {
    return (
      <main className='center min-h-screen w-screen flex-col gap-3'>
        <div className='center flex-col gap-3'>
          <p className='text-center font-light text-sm'>
            You have already created a card
          </p>
          <Link
            to='/wallet'
            className='center w-full rounded-lg bg-white p-3 font-semibold text-black'
          >
            Go to wallet
          </Link>
        </div>
      </main>
    );
  }

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
            value={formData.card_type}
            type='text'
            label='Card Type'
            placeholder='Virtual'
            name='card_type'
            disabled
          />

          <Input
            value={formData.card_brand}
            type='text'
            label='Card Brand'
            placeholder='Mastercard'
            name='card_brand'
            disabled
          />

          <Input
            value={formData.card_currency}
            type='text'
            label='Card Currency'
            placeholder='NGN'
            name='card_currency'
            disabled
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

      <button
        type='button'
        className='center mt-[3rem] w-full rounded-lg bg-white p-3 font-semibold text-black'
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </main>
  );
};

export default Card;
