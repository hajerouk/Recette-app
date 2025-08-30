import api from "./axiosInstance";

// Lister les articles avec filtres
export const getArticles = async (filters = {}) => {
  const res = await api.get("/articles", { params: filters });
  return res.data;
};

// Créer un article
export const createArticle = async (article) => {
  // On s'assure de ne pas envoyer "id" dans le body
  const { id, ...articleData } = article;
  const res = await api.post("/articles", articleData);
  return res.data;
};

// Modifier un article
export const updateArticle = async (id, article) => {
  // On utilise PATCH car ton backend NestJS attend un PATCH et non un PUT
  const res = await api.patch(`/articles/${id}`, article);
  return res.data;
};

// Supprimer un article
export const deleteArticle = async (id) => {
  const res = await api.delete(`/articles/${id}`);
  return res.data;
};
