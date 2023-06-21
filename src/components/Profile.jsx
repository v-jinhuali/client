import { useMsal } from "@azure/msal-react";
import { protectedResources } from "../authConfig";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const Profile = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const { instance, accounts } = useMsal();
  const { error, execute } = useFetchWithMsal({
    scopes: [...protectedResources.graph.scopes.read],
  });

  const RequestProfileUsingAPI = async () => {
    const data = await execute("GET", protectedResources.graph.endpoint);
    setData1(data);
  };
  const RequestProfileUsingMSAL = async () => {
    setData2(accounts[0]);
  };
  return (
    <>
      <Button variant="secondary" onClick={RequestProfileUsingAPI}>
        Request Profile using Graph
      </Button>
      <p>
        {error ? <p>{error.errorMessage}</p> : data1 && JSON.stringify(data1)}
      </p>
      <hr />
      <Button variant="secondary" onClick={RequestProfileUsingMSAL}>
        Request Profile using MSAL
      </Button>
      <p>{data2 && JSON.stringify(data2)}</p>
    </>
  );
};
