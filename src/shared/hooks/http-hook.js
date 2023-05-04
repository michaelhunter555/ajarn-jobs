import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  //error state
  const [error, setError] = useState();
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //store data across re-render cycles
  const activeHttpRequest = useRef([]);

  //API reqest
  const sendRequest = useCallback(
    //set methods with defaults
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      //current property holds array that doesnt change across re-render
      //push the abort controller.
      const httpAbortController = new AbortController();
      activeHttpRequest.current.push(httpAbortController);

      //fetch and parameters depending on GET,POST,PATCH, DELETE
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortController.signal,
      });

      try {
        //await json data
        const data = await response.json();

        //filter out the current controller for this request
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (req) => req !== httpAbortController
        );
        //if response not ok, throw error
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

  //clean up active http request
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((e) => {
        return e.abort();
      });
    };
  }, [activeHttpRequest]);

  //clear error message
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
