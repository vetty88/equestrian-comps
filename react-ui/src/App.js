import React, { useCallback, useEffect, useState, Component } from 'react';
// Node Modules
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";


// Project Files
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Admin from "./views/Admin/Admin";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

// Styling
import "./assets/css/material-dashboard-react.css";
import './index.css';
import logo from './logo.svg';
import './App.css';

// Check for token to keep user logged in
if (localStorage.TOKEN_KEY) {
  // Set auth token header auth
  const token = localStorage.TOKEN_KEY;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class AppClass extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                    {/* <Navbar /> */}
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Switch>
                        <PrivateRoute path="/admin" component={Admin} />
                    </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
    <AppClass/>
    </div>
  );

}

export default App;

export {AppClass};
