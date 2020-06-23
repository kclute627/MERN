import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import Login from "./Components/Auth/Login";
import Reg from "./Components/Auth/Reg";

import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/reg" component={Reg}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </section>
    </Fragment>
    
  </Router>
);

export default App;
