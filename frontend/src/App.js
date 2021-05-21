import React from "react";
import { Route, BrowserRouter, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
