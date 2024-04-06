import axios, { AxiosError } from 'axios';

export const nomadCardApiClient = axios.create({
  baseURL: import.meta.env.VITE_NOMAD_CARD_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function handleNomadCardApiError(e: unknown) {
  const error = e as AxiosError<NomadCardApiErrorResponse>;
  let message: string;
  if (error.response) message = error.response.data.message;
  else if (error.request) message = 'No response from server';
  else if (error.message) message = error.message;
  else message = 'An error occurred';
  return message;
}
