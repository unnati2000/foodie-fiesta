import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UseContext } from "../App";

const SignIn = () => {
  const { dispatch } = useContext(UseContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId token
          }
        }
      `,
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          localStorage.setItem("token", data.data.login.token);

          localStorage.setItem("userId", data.data.login.userId);

          dispatch({ type: "USER", payload: data.data.login.userId });

          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      <div className="food row">
        <div className="foodie col-lg-6 col-md-12">
          <h1>
            Welcome to <span className="span">Foodie-Fiesta</span>
          </h1>
          <h2>Explore your favourite dishes!</h2>
          <h5>OR</h5>
          <h3>Make your own cooking channel!</h3>

          <button>
            <Link to="/about" style={{ color: "#28b485" }}>
              About
            </Link>
          </button>
        </div>
        <form className="sign col-lg-6 col-md-12" onSubmit={onSubmit}>
          <h1>Sign in</h1>
          <label>Username</label>
          <br />
          <input
            type="email"
            className="underline-from-left"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            className="underline-from-left"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <button className="btns">Sign in</button>
          <Link to="/signup">
            <h5 className="account">
              Don't have an account? Click here to Sign Up
            </h5>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
