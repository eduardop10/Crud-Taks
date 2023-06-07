import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../apiConfig.json";
import axios from "axios";
import "./Posts.css";
import LoadingSpinner from "../../Components/LoadingSpinner";

const priorityTranslations = {
  HIGH: "Alta",
  MEDIUM: "Média",
  LOW: "Baixa",
};

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${config.apiUrl}/tasks`);
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    try {
      setIsDeleting(true);
      setSelectedPostId(post.id);
      await axios.delete(`${config.apiUrl}/tasks/${post.id}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsDeleting(false);
      setSelectedPostId("");
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
          className={`btn btn-primary mb-4 ${
            isLoading ? "btn-loading" : "" // Adiciona a classe CSS para o botão com spinner na tela inicial
          }`}
          disabled={isDeleting || isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Nova Tarefa"}
        </button>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data de criação</th>
                <th>Data de conclusão</th>
                <th>Prioridade</th>
                <th>Editar</th>
                <th>Deletar</th>
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
                      disabled={isDeleting}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(post)}
                      className={`btn btn-danger ${
                        post.id === selectedPostId && isDeleting
                          ? "btn-with-spinner" // Adiciona a classe CSS para o botão com spinner durante a exclusão
                          : ""
                      }`}
                      disabled={isDeleting || post.id === selectedPostId}
                    >
                      {post.id === selectedPostId && isDeleting ? (
                        <LoadingSpinner small />
                      ) : (
                        "Deletar"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Posts;
