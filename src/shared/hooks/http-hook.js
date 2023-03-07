import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const useHttpClient = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortController = new AbortController();
      activeHttpRequest.current.push(httpAbortController);

      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortController.signal,
      });

      try {
        const data = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (req) => req !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        return data;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((e) => {
        return e.abort();
      });
    };
  }, [activeHttpRequest]);

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
