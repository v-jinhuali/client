import { NavigationBar } from "./NavigationBar";

export const PageLayout = (props) => {
  return (
    <>
      <NavigationBar />
      <br />
      <br />
      {props.children}
    </>
  );
};
