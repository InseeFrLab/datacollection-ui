import { NavLink } from "react-router-dom";
import { menuDictionary } from "i18n";
import "./menu.css";

export const Menu = () => {
  return (
    <div className="navigation">
      <NavLink to="/portail/mes-enquetes">{menuDictionary.mySurveys}</NavLink>
      <NavLink to="/portail/mon-compte">{menuDictionary.myAccount}</NavLink>
    </div>
  );
};
