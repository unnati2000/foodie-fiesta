import React, { useContext } from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  const style = {
    marginRight: "0",
    padding: "10px 40px",
    borderRadius: "10px",
    border: "none",
    borderColor: "white",
    color: "black",
  };

  const navStyle = {
    color: "white",
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ fontFamily: "Montserrat", color: "white !important" }}
    >
      <a className="navbar-brand" href="#">
        <span className="foodie-fiesta">Foodie-Fiesta</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNav"
        style={{ navStyle }}
      >
        <ul className="navbar-nav ">
          <li className="nav-item active">
            <Link to="/" style={navStyle}>
              Home
            </Link>
          </li>
          <li className="nav-item" style={navStyle}>
            <Link to="/createpost" style={navStyle}>
              Create Post
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" style={navStyle}>
              My Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" style={navStyle}>
              About
            </Link>
          </li>
        </ul>
        <button
          className="text-right logout btn btn-danger ml-3"
          style={{ marginRight: "0" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
