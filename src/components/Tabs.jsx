// Вкладки с дополнительной инфой о курсе 
import { NavLink } from "react-router-dom";

export const Tabs = ({ tabs }) => {
  return (
    <div className="tabs">
      {tabs.map(({ path, title }) => ( 
        <div className="tab-link" key={path}> 
          <div className="tab-link-wrapper">
            <NavLink 
              to={path}
              end
              aria-current="page"
              className={({ isActive }) => `tab-link ${isActive ? "tab-link-active" : ""}`}
            >
              {title}
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};
