import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "./Button"; // Import the Button component

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>TimeTok<span className="normal"> - Track Time Easily</span></h1>
        </Link>
        <nav>
        {user && (
  <div>
    <span>Welcome </span>
    <span style={{ fontWeight: 'bold',  }}>{user.email} !</span>

    <button className="c-button c-button--gooey" onClick={handleClick}>
      <div className="c-button__blobs">
        <div></div>
        <div></div>
        <div></div>
      </div>
      Log out
    </button>
  </div>
)}
          {!user && (
            <div style={{ display: 'flex', gap: '10px' }} >
              <Link to="/login">
                <Button text="Login" /> {/* Use the Button component for Login */}
              </Link>
              <Link to="/signup">
                <Button text="Sign Up"/> {/* Use the Button component for Sign Up */}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
