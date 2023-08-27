import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          URL Shortener
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="http://127.0.0.1:8000/register/shorten/"
                    style={{
                      color: "white", // Change the link text color
                      backgroundColor: "purple", // Change the background color
                      padding: "10px 20px", // Add padding
                      borderRadius: "5px", // Add rounded corners
                      fontWeight: "light", // Make the text bold
                    }}
                  >
                    click here to check out the URL shortener
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logoutUser}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        {user && (
          <div className="ml-auto text-center">
            <h2 className="mt-3">Namaskaaram, {user.username}</h2>
            <div className="alert alert-info mt-3">
              <strong>JWT-details</strong> <br />
              Info given below is for{" "}
              <strong>task/project demonstration!</strong>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3>Token info:</h3>
                <p>Token Type: {user.token_type}</p>
                <p>Expiration: {user.exp}</p>
                <p>Issued At: {user.iat}</p>
                <p>JTI: {user.jti}</p>
                <p>User ID: {user.user_id}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
