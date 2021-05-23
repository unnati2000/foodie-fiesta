import React, { useEffect, useState, useContext } from "react";
import { UseContext } from "../App";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const { state, dispatch } = useContext(UseContext);

  useEffect(() => {
    let requestBody = {
      query: `
          query {
            me {
                name
                email
                channelname
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
      .then((data) => setUser(data.data.me))
      .catch((err) => console.log(err));

    let postBody = {
      query: `
            query {
              myposts {
                  title
                  steps
                  photo
              }
            }
          `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.data.myposts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile_div container-fluid">
      <Navbar />
      <div className="row  container-fluid">
        <div className="col-md-12">
          <div class="card">
            <div class="card-header">
              <h1 className="text-center mt-4" style={{ color: "white" }}>
                {user?.channelname}
              </h1>
            </div>
            <div class="card-body">
              <span>
                <img
                  src="https://thumbs.dreamstime.com/b/vector-illustration-cartoon-chef-presenting-food-cartoon-chef-140537702.jpg"
                  alt=""
                  class="card-img"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row follow_section">
        <div className="col-md-4">
          <h2>{user?.name}</h2>
          <h5>{user?.email}</h5>
        </div>
        <div className="col-md-8">
          <div className="row">
            <h4 className="col-md-4 ">{posts?.length} posts</h4>
            <h4 className="col-md-4">followers</h4>
            <h4 className="col-md-4">following</h4>
          </div>
        </div>
      </div>

      <div className="body text-center">
        <h1 className="text-center">Posts</h1>

        <div className="mt-3">
          <div className="containt">
            {posts
              ? posts.length > 0
                ? posts.map((post) => (
                    <div className="cardz">
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
export default Profile;
