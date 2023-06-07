// Post.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../apiConfig.json";
import axios from "axios";
import "./Post.css";
import LoadingSpinner from "../../Components/LoadingSpinner";

const priorityTranslations = {
  HIGH: "Alta",
  MEDIUM: "Média",
  LOW: "Baixa",
};

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`${config.apiUrl}/tasks/${id}`);
          const { title, description, dueDate, priority } = data;
          setPost({
            title,
            description,
            dueDate: new Date(dueDate).toISOString().slice(0, 16),
            priority,
          });
          setIsLoading(false);
        } catch (error) {
          console.log("Error:", error);
          setIsLoading(false);
        }
      };
      fetchPost();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formattedPost = {
        ...post,
        dueDate: new Date(post.dueDate).toISOString(),
      };
      if (id === "new") {
        await axios.post(`${config.apiUrl}/tasks`, formattedPost);
      } else {
        await axios.put(`${config.apiUrl}/tasks/${id}`, formattedPost);
      }
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <form className="post">
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description..."
            name="description"
            value={post.description}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="dueDate"
            value={post.dueDate}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={post.priority}
            onChange={handleChange}
          >
            <option value="HIGH">{priorityTranslations.HIGH}</option>
            <option value="MEDIUM">{priorityTranslations.MEDIUM}</option>
            <option value="LOW">{priorityTranslations.LOW}</option>
          </select>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
