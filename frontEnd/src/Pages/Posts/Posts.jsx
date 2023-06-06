import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import "./Posts.css";

const priorityTranslations = {
  HIGH: "Alta",
  MEDIUM: "Média",
  LOW: "Baixa",
};

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${config.apiUrl}/tasks`);
        setPosts(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    try {
      await axios.delete(`${config.apiUrl}/tasks/${post.id}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const translatePriority = (priority) => {
    return priorityTranslations[priority] || priority;
  };

  return (
    <div className="posts">
      <div className="container">
        <button
          onClick={() => navigate("/post/new")}
          className="btn btn-primary mb-4"
        >
          Nova Tarefa
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data de criação</th>
              <th>Data de conclusão</th>
              <th>Prioridade</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>
                <td>{new Date(post.dueDate).toLocaleString()}</td>
                <td>{translatePriority(post.priority)}</td>
                <td>
                  <button
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
