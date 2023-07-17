import axios from 'axios';
import queryString from 'query-string';
import { ServicePlanInterface, ServicePlanGetQueryInterface } from 'interfaces/service-plan';
import { GetQueryInterface } from '../../interfaces';

export const getServicePlans = async (query?: ServicePlanGetQueryInterface) => {
  const response = await axios.get(`/api/service-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createServicePlan = async (servicePlan: ServicePlanInterface) => {
  const response = await axios.post('/api/service-plans', servicePlan);
  return response.data;
};

export const updateServicePlanById = async (id: string, servicePlan: ServicePlanInterface) => {
  const response = await axios.put(`/api/service-plans/${id}`, servicePlan);
  return response.data;
};

export const getServicePlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/service-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServicePlanById = async (id: string) => {
  const response = await axios.delete(`/api/service-plans/${id}`);
  return response.data;
};
