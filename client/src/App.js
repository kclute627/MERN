import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import Login from "./Components/Auth/Login";
import Reg from "./Components/Auth/Reg";
import Dashboard from "./Components/dashboard/Dashboard";
import Alert from "./Components/Layout/Alert";
import PrivateRoute from "./Components/routing/PrivateRoute";
import CreateProfile from "./Components/ProfileForms/CreateProfile";
import addExp from "./Components/ProfileForms/AddExp";
import addEducation from "./Components/ProfileForms/AddEducation";
import EditProfile from "./Components/ProfileForms/EditProfile";
import "./App.css";
// REDUX
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./Util/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/reg' component={Reg} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
               <PrivateRoute
                exact
                path='/add-experience'
                component={addExp}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={addEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
