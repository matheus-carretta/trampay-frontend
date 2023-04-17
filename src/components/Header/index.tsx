import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signin">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;