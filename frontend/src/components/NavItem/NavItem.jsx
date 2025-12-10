import { NavLink } from "react-router-dom";


function NavItem({ icon, text, url, state }) {
  const activeClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  const activeStyle = ({ isActive }) => (
    isActive
      ? {fontWeight: "700", color: "#5cb85c"}                           // let CSS handle active color
      : {fontWeight: "700", color: "#1e40af" }         // inactive color
  );
  return (
    <li className="nav-item">
      <NavLink className={activeClass} style={activeStyle} end state={state} to={url}>
        {icon && <i className={icon}></i>} {text}
      </NavLink>
    </li>
  );
}

export default NavItem;
