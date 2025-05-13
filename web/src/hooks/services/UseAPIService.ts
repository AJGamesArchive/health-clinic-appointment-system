// Imports
import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import api from "../../services/api";

/**
 * Type to define the HTTP methods that can be called on the server API
 */
export type APIMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Type to define the request options
 */
export type APIRequestOptions = {
  immediate: boolean;
  ignoreStatusCodes?: number[];
};

/**
 * Type to define the data returned from a server API request
 */
export type APIResponse<T> = {
  status: number;
  data: T | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  reTrigger: (
    overrideIgnoreStatusCodes?: number[],
    reqEndpoint?: string,
    reqBody?: object,
  ) => Promise<number>;
  sendBackgroundRequest: (
    overrideIgnoreStatusCodes?: number[],
    reqEndpoint?: string,
    reqBody?: object,
    reqQuery?: object,
  ) => Promise<number>;
};

/**
 * React hook to send HTTP requests to the server API
 * @param method HTTP method to use
 * @param endpoint Server API endpoint to target
 * @param body Object to pass as request body
 * @param options Additional request options
 * @param queries Optional queries to add to the URL
 */
function useAPIService<T>(
  method: APIMethods,
  endpoint: string,
  body: object,
  queries: object,
  headers: object,
  options: APIRequestOptions = {
    immediate: true,
    ignoreStatusCodes: [],
  },
): APIResponse<T> {
  // Hook states
  const [status, setStatus] = useState<number>(0);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to send a stateless HTTP request
   * @param overrideIgnoreStatusCodes Optional list of status codes to ignore
   * @param reqEndpoint Optional request endpoint
   * @param reqBody Optional request body
   * @param reqQueries Optional request queries
   * @param reqHeaders Optional request headers
   * @note If no params are passed, the hook will use the default values
   * @note Will not update any hook states
   * @returns HTTP status code
   */
  const sendBackgroundRequest = async (
    overrideIgnoreStatusCodes?: number[],
    reqEndpoint?: string,
    reqBody?: object,
    reqQueries?: object,
    reqHeaders?: object,
  ): Promise<number> => {
    // Send request
    try {
      // Send HTTP request based on given params
      var response; 
      switch(method) {
        case 'GET':
          response = await api.get<T>(`${reqEndpoint ?? endpoint}`,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'POST':
          response = await api.post<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'PUT':
          response = await api.put<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'PATCH':
          response = await api.patch<T>(
            `${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'DELETE':
          response = await api.delete<T>(
            `${reqEndpoint ?? endpoint}`,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        default:
          throw new Error('Invalid HTTP Method');
      };

      // Handle successful request
      return response.status;
    } catch (error: any) {
      // Handle failed request
      const axiosError: AxiosError = error as AxiosError;

      // Return a neutral response if the error code is in the ignore list
      if(
        axiosError.response &&
        ((overrideIgnoreStatusCodes)
          ? overrideIgnoreStatusCodes.includes(axiosError.response.status)
          : options.ignoreStatusCodes?.includes(axiosError.response.status)
        )
      ) {
        setStatus(axiosError.response.status);
        return axiosError.response.status;
      };

      // Handle error and return status code
      return axiosError.response ? axiosError.response.status : 0;
    };
  };

  /**
   * Function to send the HTTP request
   * @param overrideIgnoreStatusCodes Optional list of status codes to ignore
   * @param reqEndpoint Optional request endpoint
   * @param reqBody Optional request body override
   * @param reqQueries Optional request queries override
   * @param reqHeaders Optional request headers override
   * @note If no params are passed, the hook will use the default values
   * @note Will update the hook states
   * @returns HTTP status code
   */
  const sendRequest = useCallback(async (
    overrideIgnoreStatusCodes?: number[],
    reqEndpoint?: string,
    reqBody?: object,
    reqQueries?: object,
    reqHeaders?: object,
  ): Promise<number> => {
    // Reset states
    setLoading(true);
    setMessage(null);
    setError(null);
    setData(null);

    // Send request
    try {
      // Send HTTP request based on given params
      var response; 
      switch(method) {
        case 'GET':
          response = await api.get<T>(`${ reqEndpoint ?? endpoint}`,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'POST':
          response = await api.post<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'PUT':
          response = await api.put<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'PATCH':
          response = await api.patch<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        case 'DELETE':
          response = await api.delete<T>(`${reqEndpoint ?? endpoint}`,
            {
              headers: reqHeaders ?? headers,
              params: reqQueries ?? queries,
            }
          );
          break;
        default:
          throw new Error('Invalid HTTP Method');
      };

      // Handle successful request
      setStatus(response.status);
      setData(response.data);
      setMessage(response.data ? (response.data as any).message : null);
      setLoading(false);
      return response.status;
    } catch (error: any) {
      // Handle failed request
      const axiosError: AxiosError = error as AxiosError;

      // Return a neutral response if the error code is in the ignore list
      if(
        axiosError.response &&
        ((overrideIgnoreStatusCodes)
          ? overrideIgnoreStatusCodes.includes(axiosError.response.status)
          : options.ignoreStatusCodes?.includes(axiosError.response.status)
        )
      ) {
        setStatus(axiosError.response.status);
        setMessage(axiosError.response.data ? (axiosError.response.data as any).message : null);
        setLoading(false);
        return axiosError.response.status;
      };

      // Handle error and return status code
      const errorMessage: string =
        `[Error: ${
          axiosError.response ? axiosError.response.status : 0
        }]: ${
          (axiosError.response && axiosError.response.data) ? (axiosError.response.data as any).message : axiosError.message || 'An error occurred.'
        }`;
      setError(errorMessage);
      setStatus(axiosError.response ? axiosError.response.status : 0);
      setLoading(false);
      return axiosError.response ? axiosError.response.status : 0;
    };
  }, [endpoint, body, queries, headers]);

  // Send request on initial render if immediate option flag is present
  useEffect(() => {
    if(options.immediate) sendRequest();
  }, [options.immediate]);

  // Return states
  return {
    status,
    data,
    loading,
    error,
    message,
    reTrigger: sendRequest,
    sendBackgroundRequest,
  };
};

export default useAPIService;