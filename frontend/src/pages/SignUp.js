import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channelname, setChannelNAme] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  return (
    <div className="main">
      <div className="food row">
        <div className="foodie_sign_up col-lg-6 col-md-12">
          <h1>Welcome to Foodie-Fiesta</h1>
          <h2>Explore your favourite dishes!</h2>
          <h5>OR</h5>
          <h3>Make your own cooking channel!</h3>

          <button>
            <Link to="/about" style={{ color: "#28b485" }}>
              About
            </Link>
          </button>
        </div>
        <div className="signup col-lg-6 col-md-12">
          <h1 className="mb-4">Sign Up</h1>
          <label>Name</label>
          <br />
          <input
            type="Name"
            className="underline-from-left"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            className="underline-from-left"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            className="underline-from-left"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <label>Channel Name</label>
          <br />
          <input
            type="text"
            value={channelname}
            className="underline-from-left"
            placeholder="Enter channel name"
            onChange={(e) => setChannelNAme(e.target.value)}
          />
          <br></br>

          <label>Upload image</label>
          <br />
          <input
            type="file"
            className="mt-2 mb-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button className="btns mt-3">Sign Up</button>
          <br />
          <Link to="/signin">
            <h5 className="account">
              Already have an account? Click here to Sign In
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
