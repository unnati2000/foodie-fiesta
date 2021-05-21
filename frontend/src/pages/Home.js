import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div
        className="body text-center"
        style={{ paddingTop: "30px", paddingBottom: "200px" }}
      >
        <div className="containt">
          <div className="mt-5">
            <div className="cardz">
              <div className="imgx">
                <img src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/eggs-breakfast-avocado-1296x728-header.jpg?w=1155&h=1528" />
              </div>
              <div className="context">
                <h3>
                  <i className="fa fa-cutlery mr-3" aria-hidden="true"></i>
                </h3>
                <p>
                  <i
                    className="fa fa-thumbs-up mr-3 text-left"
                    aria-hidden="true"
                  ></i>
                </p>
                <p>
                  <i className="fa fa-television mr-3" aria-hidden="true"></i>
                </p>
                <Link to={"/singlepost/"}>
                  <li className="button-cardx">View Recipe</li>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
