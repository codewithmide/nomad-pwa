import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { nomadCardApiClient as api } from '../helpers/axios';

export default function useNomadCardApiClient() {
  const { authToken } = useDynamicContext();
  if (authToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }
  return api;
}
