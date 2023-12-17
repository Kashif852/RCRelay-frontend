import { fetchData } from './api';

export const checkout = async (items) => {
  return await fetchData('/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }), 
  });
};