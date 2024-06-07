import { useCallback, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useStripe = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isPostLoading, errorMessage, clearError } =
    useHttpClient();
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const createCheckoutSession = useCallback(
    async (id, priceId, credits) => {
      const response = await sendRequest(
        `${process.env.REACT_APP_STRIPE}/${id}/create-stripe-checkout`,
        "POST",
        JSON.stringify({ priceId: priceId, credits: credits }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (!response.ok) {
        throw new Error(response.message);
      }

      setCheckoutUrl(response.url);
    },
    [sendRequest, auth.token]
  );

  return {
    createCheckoutSession,
    isPostLoading,
    errorMessage,
    clearError,
    checkoutUrl,
  };
};
