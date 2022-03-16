import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Home from "./components/blog/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";

export const AuthContext = React.createContext();

function App() {
  const [currentUser, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  async function changeContext(user, Jwt) {
    localStorage.setItem("jwt", Jwt);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setJwt(Jwt);
  }

  async function deleteContext() {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setUser(null);
    setJwt(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, jwt }}>
      <Router>
        <div className="App">
          <Navbar deleteContext={deleteContext} />
          <Routes>
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
    </AuthContext.Provider>
  );
}

export default App;
