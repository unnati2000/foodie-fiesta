import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [steps, setSteps] = useState([{ value: null }]);
  const history = useHistory();

  function handleChange(i, event) {
    const values = [...steps];
    values[i].value = event.target.value;
    setSteps(values);
  }

  function handleAdd() {
    const values = [...steps];
    values.push({ value: null });
    setSteps(values);
  }

  function handleRemove(i) {
    const values = [...steps];
    values.splice(i, 1);
    setSteps(values);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "insta-clone");
      formdata.append("cloud_name", "dsdhcbxrf");
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dsdhcbxrf/image/upload`,
        formdata
      );

      setUrl(data.url);
    } catch (error) {
      console.log(error.message);
    }

    let requestBody = {
      query: `
          mutation {
            createPost(postInput:{ title: "${title}", steps: "${steps}", photo: "${url}" }) {
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
        console.log("data", data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navbar />
      <div className="food-header">
        <div className="content text-center">
          <h2>Wanna share a recipe???</h2>
          <p>
            <span>Foodie-Fiesta</span> gives you an opportunity to show your
            cooking skills to the world
          </p>
          <h5>
            What are waiting for ? Post your own recipe and let reach everyone
          </h5>
        </div>
      </div>

      <div className="main-body">
        <div className="row">
          <form className="posts col-lg-6" onSubmit={onSubmit}>
            <label>Enter Title</label>
            <br />
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            <div>
              <h5>Upload image</h5>
              <input
                type="file"
                className="mt-2 mb-2"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <label className="mt-4">Enter Steps of recipe</label>
            <br />

            <button type="button" className="add" onClick={() => handleAdd()}>
              +
            </button>

            {steps.map((step, idx) => {
              return (
                <div key={`${step}-${idx}`}>
                  <input
                    type="text"
                    placeholder="Enter text"
                    onChange={(e) => handleChange(idx, e)}
                  />
                  <button
                    type="button"
                    className="cross"
                    onClick={() => handleRemove(idx)}
                  >
                    x
                  </button>
                </div>
              );
            })}

            <button className="mt-3" type="submit">
              Submit Post
            </button>
          </form>

          <div className="col-lg-6 text-center">
            <div className="mosaic">
              <div className="mosaic__item img1">
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&w=1000&q=80" />
              </div>
              <div className="mosaic__item img2">
                <img src="https://www.eatright.org/-/media/eatrightimages/health/pregnancy/fertilityandreproduction/bean-corn-tomato-salad-1056788234.jpg?h=450&w=600&la=en&hash=8E919F45C2E0A8D540BB725663DD2F7F3A8CB804" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
