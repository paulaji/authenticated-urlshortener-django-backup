import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">
          Django-React | JWT | Authenticator{" "}
        </h3>
        <h5 className="mb-4 text-center">Login</h5>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link to="http://localhost:8000/register/registeruser/">
              Register
            </Link>
          </p>
          <p>Or</p>
          <small>Use the following test account(s):</small>
          <br />
          <small>
            username: <span style={{ color: "blue" }}>user1</span> or{" "}
            <span style={{ color: "blue" }}>user2</span>
          </small>
          <br />
          <small>
            username: <span style={{ color: "blue" }}>resu321321</span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
