import { fetchData } from '../api'; 
import fetchMock from 'jest-fetch-mock';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('fetchData', () => {
  const mockEndpoint = '/test-endpoint';

  it('fetches data successfully from an endpoint', async () => {
    const mockJsonResponse = { data: 'some data' };
    fetch.mockResponseOnce(JSON.stringify(mockJsonResponse));

    const data = await fetchData(mockEndpoint);

    expect(data).toEqual(mockJsonResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}${mockEndpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('fetches with additional options if provided', async () => {
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify({ key: 'value' }),
      headers: {
        'X-Custom-Header': 'custom value'
      }
    };
    const mockJsonResponse = { data: 'some data' };
    fetch.mockResponseOnce(JSON.stringify(mockJsonResponse));

    const data = await fetchData(mockEndpoint, mockOptions);

    expect(data).toEqual(mockJsonResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}${mockEndpoint}`, {
      ...mockOptions,
      headers: {
        'Content-Type': 'application/json',
        ...mockOptions.headers,
      },
    });
  });

  it('throws an error when the fetch response is not ok', async () => {
    fetch.mockResponseOnce('', { status: 404 });

    await expect(fetchData(mockEndpoint)).rejects.toThrow('API call failed with status: 404');
  });

  it('logs the error and re-throws it if the fetch itself fails', async () => {
    const mockError = new Error('Network failure');
    fetch.mockReject(mockError);

    await expect(fetchData(mockEndpoint)).rejects.toThrow('Network failure');
    expect(console.error).toHaveBeenCalledWith('Fetching data error:', mockError);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

