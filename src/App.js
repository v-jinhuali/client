import { MsalProvider } from "@azure/msal-react";
import "./App.css";
import { Home } from "./pages/Home";
import { PageLayout } from "./components/PageLayout";

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <Home></Home>
      </PageLayout>
    </MsalProvider>
  );
};
export default App;
