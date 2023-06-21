import { useState, useCallback } from "react";

import { useMsal } from "@azure/msal-react";

const useFetchWithMsal = (msalRequest) => {
  const { instance, accounts } = useMsal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (method, endpoint, data = null) => {
    try {
      const token = await instance.acquireTokenSilent({
        ...msalRequest,
        account: accounts[0],
      });
      if (token) {
        try {
          let response = null;

          const header = new Headers();
          const bearer = "Bearer " + token.accessToken;
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
              setError(null);
            } catch (error) {
              setError(error);
            } finally {
              setData(responseData);
              return responseData;
            }
          }

          return response;
        } catch (e) {
          setError(e);
          throw e;
        } finally {
          setIsLoading(false);
        }
      } else {
        instance.loginPopup().catch((e) => {
          setError(e);
        });
      }
    } catch (e) {
      instance.loginPopup().catch((e) => {
        setError(e);
      });
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, [msalRequest]),
  };
};

export default useFetchWithMsal;
