import useSWR from 'swr';
import useNomadCardApiClient from './use-nomad-card-api-client';

export default function useNomadCardUser() {
  const api = useNomadCardApiClient();
  return useSWR('nomad-card-user', async () => {
    const res = await api.get<NomadCardApiWhoAmIResponse>('/auth/whoami');
    return res.data.data;
  });
}
