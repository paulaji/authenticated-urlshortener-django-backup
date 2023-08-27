import "./App.css";

// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages import
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// components import
import Header from "./components/Header";

// utils import
// PrivateRoutes util
import PrivateRoutes from "./utils/PrivateRoutes";

// login context import
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            {/* making HomePage a private route and accessible only if user is authenticated */}
            <Route element={<PrivateRoutes />}>
              <Route element={<HomePage />} path="/" exact />
            </Route>
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
