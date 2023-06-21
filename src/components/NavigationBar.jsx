import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Navbar, Button } from "react-bootstrap";

import { loginRequest } from "../authConfig";

export const NavigationBar = () => {
  const { instance, accounts } = useMsal();

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogoutPopup = () => {
    instance
      .logoutPopup({
        mainWindowRedirectUri: "/", // redirects the top level app after logout
        account: instance.getActiveAccount(),
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <AuthenticatedTemplate>
          <Button variant="secondary" onClick={handleLogoutPopup}>
            Sign out
          </Button>
          <p style={{ color: "white" }}>{accounts[0]?.name}</p>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button variant="secondary" onClick={handleLoginPopup}>
            Sign in
          </Button>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};
