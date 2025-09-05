import { useState, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupérer les catégories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Erreur fetch catégories:", error);
      setMessage({ type: "error", text: "Erreur lors du chargement des catégories ❌" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Ajouter une catégorie
  const handleAdd = async () => {
    if (!name.trim()) {
      setMessage({ type: "error", text: "Le nom de la catégorie est requis !" });
      return;
    }

    try {
      await api.post("/categories", { name });
      setMessage({ type: "success", text: "Catégorie ajoutée avec succès ✅" });
      setName("");
      fetchCategories();
    } catch (error) {
      console.error("Erreur ajout catégorie:", error);
      if (error.response && error.response.status === 400) {
        setMessage({ type: "error", text: "Une catégorie avec ce nom existe déjà ❌" });
      } else {
        setMessage({ type: "error", text: "Erreur lors de l'ajout ❌" });
      }
    }
  };

  return (
    <div className="page">
      <h2>Gestion des Catégories</h2>

      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="form">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={handleAdd} disabled={loading}>
          ➕ Ajouter
        </button>
      </div>

      {loading ? (
        <p>Chargement des catégories...</p>
      ) : (
        <ul className="list">
          {categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
