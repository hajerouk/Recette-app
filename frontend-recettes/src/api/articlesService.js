import api from "./axiosInstance";

export const getArticles = async (filters = {}) => {
  const res = await api.get("/articles", { params: filters });
  return res.data;
};

export const createArticle = async (article) => {
  const res = await api.post("/articles", article);
  return res.data;
};

// Utilisation de PUT pour mettre à jour un article
export const updateArticle = async (id, article) => {
  const res = await api.put(`/articles/${id}`, article);
  return res.data;
};

export const deleteArticle = async (id) => {
  const res = await api.delete(`/articles/${id}`);
  return res.data;
};
