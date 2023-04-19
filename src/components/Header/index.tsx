import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../public/images/casa.png";

const Header = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth'));

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuthToken(null);
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="logo" width={"45px"} />
            </Link>
          </li>
          {authToken ? (
            <>
              <li>
                <Link onClick={handleLogout} to={"/"}>Sign Out</Link>
              </li><li>
                  <Link to="/send-balance">Send Balance</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signin">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;