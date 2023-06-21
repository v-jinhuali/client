import { protectedResources } from "../authConfig";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const ApiData = () => {
  const [data, setData] = useState(null);
  const { error, execute } = useFetchWithMsal({
    scopes: [...protectedResources.server.scopes.read],
  });

  const handleRequestData = async () => {
    const data = await execute("GET", protectedResources.server.endpoint);
    setData(data);
  };
  return (
    <>
      <Button variant="primary" onClick={handleRequestData}>
        Request protected resource
      </Button>

      {error ? <p>{error.errorMessage}</p> : data && JSON.stringify(data)}
    </>
  );
};
