import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const maslInstance = new PublicClientApplication(msalConfig);

// if (
//   !maslInstance.getActiveAccount() &&
//   maslInstance.getAllAccounts().length > 0
// ) {
//   maslInstance.setActiveAccount(maslInstance.getAllAccounts()[0]);
// }

// maslInstance.enableAccountStorageEvents();

// maslInstance.addEventCallback((event) => {
//   if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
//     const account = event.payload.account;
//     maslInstance.setActiveAccount(account);
//   }
// });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App instance={maslInstance} />
  </React.StrictMode>
);
