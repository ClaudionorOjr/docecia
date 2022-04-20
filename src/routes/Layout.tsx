import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function Layout() {
  return (
    <>
      {<Header />}
      <div className={'page-content'}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;