import { fetchData } from './api';

export const getProducts = async () => {
  return await fetchData('/products');
};
