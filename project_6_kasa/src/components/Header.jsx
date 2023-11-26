import { NavLink } from "react-router-dom";
import logo from "../assets/static/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="navbar container">
        <NavLink to="/">
          <img className="logo" src={logo} alt="kasa logo" />
        </NavLink>
        <nav className="menu">
          <ul>
            <li>
              <NavLink className="nav-link" to="/">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about">
                A propos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
