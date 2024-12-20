import { useCallback, useEffect, useRef, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

export const useHttpClient = (props) => {
  const queryClient = useQueryClient();
  //error state
  const [error, setError] = useState();
  //loading states for GET
  const [isLoading, setIsLoading] = useState(true);
  //loading state for POST
  const [isPostLoading, setIsPostLoading] = useState(false);

  //store data across re-render cycles
  const activeHttpRequest = useRef([]);

  //API reqest
  const sendRequest = useCallback(
    //set methods with defaults
    async (url, method = "GET", body = null, headers = {}) => {
      //current property holds array that doesnt change across re-render
      //push the abort controller.
      setIsPostLoading(
        method === "POST" || method === "PATCH" || method === "DELETE"
      );
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
        setIsPostLoading(false);
        return data;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        setIsPostLoading(false);
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
    //use client.query(url) for API caching
    client: {
      query: async (url) => {
        try {
          const response = await sendRequest(url);
          return response;
        } catch (err) {
          console.log(err.message);
        }
      },
      initialData: (key) => {
        return queryClient.getQueryData([key]);
      },
    },
    isLoading,
    isPostLoading,
    error,
    sendRequest,
    clearError,
  };
};
