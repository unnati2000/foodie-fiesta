import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let requestBody = {
      query: `
          query {
            posts {
              title _id steps photo postedBy
            }
          }
        `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.data.posts))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <div
        className="body text-center"
        style={{ paddingTop: "30px", paddingBottom: "200px" }}
      >
        <div className="containt">
          <div className="mt-5">
            {posts
              ? posts.length > 0
                ? posts.map((post) => (
                    <div className="cardz" key={post?._id}>
                      <div className="imgx" key={post?._id}>
                        <img src={post?.photo} alt={post?._id} />
                      </div>
                      <div className="context">
                        <h3>
                          <i
                            className="fa fa-cutlery mr-3"
                            aria-hidden="true"
                          ></i>
                          {post?.title}
                        </h3>
                        <p>
                          <i
                            className="fa fa-thumbs-up mr-3 text-left"
                            aria-hidden="true"
                          ></i>
                        </p>
                        <p>
                          <i
                            className="fa fa-television mr-3"
                            aria-hidden="true"
                          ></i>
                        </p>
                        <Link to={"/singlepost/"}>
                          <li className="button-cardx">View Recipe</li>
                        </Link>
                      </div>
                    </div>
                  ))
                : "No Posts Yet"
              : "Loading"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
