import axios from 'axios';
import queryString from 'query-string';
import {
  CryptoMarketingServiceInterface,
  CryptoMarketingServiceGetQueryInterface,
} from 'interfaces/crypto-marketing-service';
import { GetQueryInterface } from '../../interfaces';

export const getCryptoMarketingServices = async (query?: CryptoMarketingServiceGetQueryInterface) => {
  const response = await axios.get(`/api/crypto-marketing-services${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCryptoMarketingService = async (cryptoMarketingService: CryptoMarketingServiceInterface) => {
  const response = await axios.post('/api/crypto-marketing-services', cryptoMarketingService);
  return response.data;
};

export const updateCryptoMarketingServiceById = async (
  id: string,
  cryptoMarketingService: CryptoMarketingServiceInterface,
) => {
  const response = await axios.put(`/api/crypto-marketing-services/${id}`, cryptoMarketingService);
  return response.data;
};

export const getCryptoMarketingServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/crypto-marketing-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteCryptoMarketingServiceById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-marketing-services/${id}`);
  return response.data;
};
