import axios from 'axios';

export const nomadCardApiClient = axios.create({
  baseURL: import.meta.env.VITE_NOMAD_CARD_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
