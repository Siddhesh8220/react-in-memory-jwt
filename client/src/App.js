import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Home from "./components/blog/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { postResource } from "./services/apiService";
import jwtManager from "./services/jwtManager";
import axios from "axios";

export const AuthContext = React.createContext();

function App() {
  const [currentUser, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  // const [jwt, setJwt] = useState(null);

  useEffect(() => {
    async function refreshToken() {
      const res = await axios.post(
        `http://localhost:4000/token`,
        {},
        {
          //AxiosRequestConfig parameter
          withCredentials: true, //correct
        }
      );
      jwtManager.setToken(res.data.accessToken);
      setUser(res.data.user);
      setloading(false);
      console.log("refreshed", currentUser);
    }
    refreshToken();
  }, []);

  async function changeContext(user, accessToken) {
    jwtManager.setToken(accessToken);
    setUser(user);
  }

  async function deleteContext() {
    // localStorage.removeItem("user");
    // localStorage.removeItem("jwt");
    // setUser(null);
    // setJwt(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {loading ? (
        "...loading"
      ) : (
        <Router>
          <div className="App">
            <Navbar deleteContext={deleteContext} />
            <Routes>
              <Route exact path="/" element={<Navigate to="/login" />} />
              <Route
                exact
                path="/login"
                element={<SignIn changeContext={changeContext} />}
              />
              <Route
                exact
                path="/register"
                element={<SignUp changeContext={changeContext} />}
              />
              <Route
                exact
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      )}
    </AuthContext.Provider>
  );
}

export default App;
