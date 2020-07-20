import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";
import NotFound from "./views/NotFound.jsx";
import Search from "./views/Search";
import DetailedSheet from "./components/DetailedSheet";

// auth
import { useAuth } from "./auth/useAuth";
import UserContext from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import "./styles/global.css";
function App() {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  // TO GET/SET loggedin currentUser against server response
  const UserContextValue = {
    currentUser,
    setCurrentUser,
  };
  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute exact path="/search" component={Search} />
            <ProtectedRoute exact path="/detailed" component={DetailedSheet} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
