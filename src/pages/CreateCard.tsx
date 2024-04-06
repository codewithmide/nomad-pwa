import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { toast } from 'sonner';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Input } from '../components/common/FormComponent';
import { handleNomadCardApiError } from '../helpers/axios';

const initialState: Card = {};

const CreateCard = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Card>(initialState);
  const [card, saveCard] = useLocalStorage<Card>('card', initialState);

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
      const d = formData;
      if (!d.card_name) throw new Error('Card name is required');
      if (!d.card_number) throw new Error('Card number is required');
      if (!d.expiry_date) throw new Error('Expiry date is required');
      if (!d.cvv) throw new Error('CVV is required');

      if (isNaN(+d.card_number))
        throw new Error('Card number must be a number');
      if (isNaN(+d.cvv)) throw new Error('CVV must be a number');

      if (d.card_number.length !== 16)
        throw new Error('Card number must be 16 digits');
      if (d.cvv.length !== 3) throw new Error('CVV must be 3 digits');

      saveCard(d);
      toast.success('Card created successfully', { id: toastId });
    } catch (error) {
      const message = handleNomadCardApiError(error);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (card) {
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
            value={formData.card_name}
            type='text'
            label='Card Name'
            placeholder='John Doe'
            name='card_name'
            onChange={handleChange}
          />

          <Input
            value={formData.card_number}
            type='text'
            label='Card Number'
            placeholder='0123 4567 8910 1112'
            name='card_number'
            onChange={handleChange}
          />

          <Input
            value={formData.expiry_date}
            type='month'
            label='Expiry Date'
            name='expiry_date'
            onChange={handleChange}
          />

          <Input
            value={formData.cvv}
            type='password'
            label='CVV'
            placeholder='***'
            name='cvv'
            onChange={handleChange}
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

export default CreateCard;
