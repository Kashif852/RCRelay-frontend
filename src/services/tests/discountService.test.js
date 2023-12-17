import { getDiscounts } from '../discountService';
import { fetchData } from '../api';

jest.mock('../api'); 

describe('getDiscounts service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('calls fetchData with the correct endpoint', async () => {
    await getDiscounts();

    expect(fetchData).toHaveBeenCalledWith('/discounts');
  });

  it('returns the correct response when fetchData resolves', async () => {
    const mockResponse = [{ id: 1, name: 'Discount 1' }, { id: 2, name: 'Discount 2' }];
    fetchData.mockResolvedValue(mockResponse);

    const response = await getDiscounts();

    expect(response).toEqual(mockResponse);
  });

  it('throws an error when fetchData rejects', async () => {
    const mockError = new Error('Network error');
    fetchData.mockRejectedValue(mockError);

    await expect(getDiscounts()).rejects.toThrow('Network error');
  });

});
