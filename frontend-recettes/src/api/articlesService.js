import axios from "axios";

// URL de ton backend sur Codespaces
const API_URL = "https://special-guide-6v4q9q5x7pg3rqpj-3000.app.github.dev/api";

export const getArticles = async (filters = {}) => {
  const res = await axios.get(`${API_URL}/articles`, { params: filters });
  return res.data;
};

export const createArticle = async (article) => {
  const res = await axios.post(`${API_URL}/articles`, article);
  return res.data;
};

export const updateArticle = async (id, article) => {
  const res = await axios.patch(`${API_URL}/articles/${id}`, article);
  return res.data;
};

export const deleteArticle = async (id) => {
  const res = await axios.delete(`${API_URL}/articles/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};
