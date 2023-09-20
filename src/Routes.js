import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import EMGMonitoring from "./components/EMGMonitoring";

const Routes = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
  
    const handleLogout = () => {
      setIsLoggedOut(true);
    };
  
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login {...props} onLogout={handleLogout} /> // Pass onLogout here
            )}
          />
          <Route
            path="/dashboard"
            render={(props) =>
              isLoggedOut ? (
                <Login {...props} onLogout={handleLogout} /> // Pass onLogout here
              ) : (
                <EMGMonitoring {...props} />
              )
            }
          />
        </Switch>
      </Router>
    );
  };
  
  export default Routes;