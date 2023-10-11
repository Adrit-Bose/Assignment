// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Clear the user data and JWT token from local storage
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {user ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/dashboard">
            <Dashboard user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
