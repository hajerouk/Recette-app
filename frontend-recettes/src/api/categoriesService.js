import api from "./axiosInstance";

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};



export const createCategory = async (name) => {
  const res = await api.post("/categories", { name });
  return res.data;
};
