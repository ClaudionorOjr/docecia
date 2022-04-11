import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

interface Props {
  noNavbar?: boolean;
  className?: string;
}

function Layout({ noNavbar, className = '' }: Props) {
  return (
    <>
      {<Header />}
      <div className={`${!noNavbar && 'page-content'} ${className}`}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;