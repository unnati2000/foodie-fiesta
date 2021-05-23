import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseContext } from "../App";

const SinglePost = ({ match }) => {
  const history = useHistory();

  const [post, setPost] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    let requestBody = {
      query: `
            query {
              post(postId:"${match.params.id}") {
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
      .then((data) => setPost(data.data.post))
      .catch((err) => console.log(err));

    let userBody = {
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
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.data.me))
      .catch((err) => console.log(err));
  }, [match]);

  const addComments = (text) => {
    let requestBody = {
      query: `
              mutation {
                addComment(postId:"${match.params.id}", comment:{text:"${text}", username:"${user?.name}"}) {
                  title
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
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="single_post row ">
        <div className="col-lg-4 text-center ">
          <img src={post?.photo} />
          <h5></h5>
        </div>
        <div className="recipe_post col-lg-8 text-center">
          <h1>Recipe Name: {post?.title}</h1>

          <Link to="" className="single_post_button mt-3">
            View Profile
          </Link>

          <p>Steps:</p>
          {post?.steps
            ? post.steps.map((step, ind) => {
                return (
                  <p key={ind}>
                    {ind + 1} : {step}
                  </p>
                );
              })
            : ""}

          <hr></hr>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComments(e.target[0].value);
            }}
          >
            <h4 className="text-center mt-5 mb-2">Add a comment</h4>
            <input
              type="text"
              placeholder="Add a comment"
              className="mt-3 mb-3"
            />
          </form>
          {post.comment &&
            post.comment.map((record) => {
              return (
                <div className="render-comment" key={record._id}>
                  <h5>
                    {record.username}: {record.text}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default SinglePost;
