import { useState, useCallback } from "react";

import { ClientConfigurationError, InteractionType } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

const useFetchWithMsal = (msalRequest) => {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { result, error: msalError } = useMsalAuthentication(
    InteractionType.SsoSilentRequest,
    {
      scopes: msalRequest,
      account: instance.getActiveAccount(),
    }
  );

  const execute = async (method, endpoint, data = null) => {
    if (msalError) {
      setError(msalError);
      return;
    }

    console.log("msalReqest", msalRequest);
    console.log("sc", result.scopes);

    if (result) {
      try {
        let response = null;

        const header = new Headers();
        const bearer = "Bearer " + result.accessToken;
        header.append("Authorization", bearer);

        if (data) header.append("Content-Type", "application/json");

        let options = {
          method: method,
          headers: header,
          body: data ? JSON.stringify(data) : null,
        };

        setIsLoading(true);
        response = await fetch(endpoint, options);

        if (response.status === 200 || response.status === 201) {
          let responseData = response;

          try {
            responseData = await response.json();
          } catch (error) {
            setError(error);
            console.log(error);
          } finally {
            setData(responseData);
            setIsLoading(false);
            return responseData;
          }
        }

        setIsLoading(false);
        return response;
      } catch (e) {
        setError(e);
        setIsLoading(false);
        throw e;
      }
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, [result, msalError]),
  };
};

export default useFetchWithMsal;
