// Categories.jsx
import { useState, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Récupérer les catégories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Erreur fetch catégories:", error);
      setMessage("Erreur lors du chargement des catégories ❌");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Ajouter une catégorie
  const handleAdd = async () => {
    if (!name.trim()) {
      setMessage("Le nom de la catégorie est requis !");
      return;
    }

    try {
      await api.post("/categories", { name });
      setMessage("Catégorie ajoutée avec succès ✅");
      setName("");
      fetchCategories();
    } catch (error) {
      console.error("Erreur ajout catégorie:", error);
      setMessage("Erreur lors de l'ajout ❌");
    }
  };

  return (
    <div className="page">
      <h2> Gestion des Catégories</h2>

      {message && <div className="message">{message}</div>}

      <div className="form">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          ➕ Ajouter
        </button>
      </div>

      <ul className="list">
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
