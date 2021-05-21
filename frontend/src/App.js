import React, { useEffect, createContext, useReducer, useContext } from "react";
import { Route, BrowserRouter, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { reducer, initialState } from "./reducers/userReducer";

export const UseContext = createContext();

function Routing() {
  const history = useHistory();
  const { dispatch } = useContext(UseContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch({ type: "USER", payload: userId });
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </div>
  );
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UseContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UseContext.Provider>
  );
};

export default App;
