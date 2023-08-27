import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Navigate, json } from "react-router-dom"; // Imported Navigate and json
import { useNavigate } from "react-router-dom"; // Imported useNavigate (previously useHistory)

// Create an authentication context
const AuthContext = createContext();

export default AuthContext;

// AuthProvider component responsible for managing authentication
export const AuthProvider = ({ children }) => {
  // Initialize state for authentication tokens and user
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  // Get the navigate function for routing
  const navigate = useNavigate();

  // Function to log in a user
  let loginUser = async (e) => {
    e.preventDefault();
    console.log("form submitted");

    // Send a request to the backend to obtain authentication tokens
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    // Parse the response JSON data
    let data = await response.json();
    console.log("data:", data);
    console.log("response:", response);

    // If successful response, update tokens and user data
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("We have encountered an error!");
    }
  };

  // Function to log out a user
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login/");
  };

  // Function to update/refresh the access token
  let updateToken = async () => {
    console.log("update token method called");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  // Context data containing user information and functions
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  // Invoking the updateToken every 4 minutes to get new access token so that the user stays logged in
  // In backend, we have set a timeout for each access token as 5 minutes, therefore we update the access token every 4 minutes (2400 seconds) just in case
  useEffect(() => {
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 4);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  // Provide the context data to the children components
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
