import { checkout } from '../checkoutService';
import { fetchData } from '../api';

jest.mock('../api'); 

describe('checkout service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('calls fetchData with the correct arguments', async () => {
    const items = ['sku1', 'sku2'];
    await checkout(items);

    expect(fetchData).toHaveBeenCalledWith('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
  });

  it('returns the correct response when fetchData resolves', async () => {
    const mockResponse = { total: 100 };
    fetchData.mockResolvedValue(mockResponse);

    const items = ['sku1', 'sku2'];
    const response = await checkout(items);

    expect(response).toEqual(mockResponse);
  });

  it('throws an error when fetchData rejects', async () => {
    const mockError = new Error('Network error');
    fetchData.mockRejectedValue(mockError);

    const items = ['sku1', 'sku2'];
    await expect(checkout(items)).rejects.toThrow('Network error');
  });

});
