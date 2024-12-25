import { Outlet } from "react-router-dom";
import { MainNavigation } from "./MainNavigation";

export const BaseLayout = () => {
  return (
    <div className="base-layout-menu">
      <MainNavigation />
      <div className="menu-content">
        <Outlet /> 
      </div>
    </div>
  );
};
