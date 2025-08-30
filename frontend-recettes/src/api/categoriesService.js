import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  const res = await axiosInstance.get("/categories"); 
  return res.data;
};

export const createCategory = async (name) => {
  const res = await axiosInstance.post("/categories", { name });
  return res.data;
};
