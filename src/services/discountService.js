import { fetchData } from './api';

export const getDiscounts = async () => {
  return await fetchData('/discounts');
};
