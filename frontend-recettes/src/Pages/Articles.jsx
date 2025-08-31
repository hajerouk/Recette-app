import { useState, useEffect, useCallback } from "react";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/articleService";
import { getCategories } from "../api/categoriesService";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewList, setViewList] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [message, setMessage] = useState(null);
  const [newArticle, setNewArticle] = useState({
    id: null,
    title: "",
    description: "",
    categoryId: "",
    isFavorite: false,
  });

  // Récupération des articles avec filtres
  const fetchArticles = useCallback(async () => {
    try {
      const filters = {};
      if (filterCategory) filters.categoryId = Number(filterCategory);
      if (filterFavorite) filters.isFavorite = true;

      const data = await getArticles(filters);
      setArticles(data);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erreur lors du chargement des articles." });
    }
  }, [filterCategory, filterFavorite]);

  // Récupération des catégories
  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Initialisation
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchArticles();
  }, [filterCategory, filterFavorite, fetchArticles]);

  // Ajout ou modification
  const handleAddOrUpdate = async () => {
    try {
      if (!newArticle.title || !newArticle.categoryId) {
        setMessage({ type: "error", text: "Titre et catégorie requis." });
        return;
      }

      const { id, ...articleData } = newArticle;

      if (newArticle.id) {
        await updateArticle(newArticle.id, articleData);
        setMessage({ type: "success", text: "Article modifié avec succès." });
      } else {
        await createArticle(articleData);
        setMessage({ type: "success", text: "Article ajouté avec succès." });
      }

      setNewArticle({ id: null, title: "", description: "", categoryId: "", isFavorite: false });
      setViewList(true);
      fetchArticles();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erreur lors de la sauvegarde de l'article." });
    }
  };

  const handleEdit = (article) => {
    setNewArticle(article);
    setViewList(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setMessage({ type: "success", text: "Article supprimé." });
      fetchArticles();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erreur lors de la suppression." });
    }
  };

  const toggleFavorite = async (article) => {
    try {
      await updateArticle(article.id, { isFavorite: !article.isFavorite });
      fetchArticles();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erreur lors de la mise à jour du favori." });
    }
  };

  return (
    <div className="page">
      <h2>Gestion des Articles</h2>

      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      {/* Filtres */}
      <div className="filters">
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <label>
          <input
            type="checkbox"
            checked={filterFavorite}
            onChange={e => setFilterFavorite(e.target.checked)}
          />
          Favoris uniquement
        </label>
      </div>

      <div className="toggle-buttons">
        <button onClick={() => setViewList(true)}>Voir les articles</button>
        <button onClick={() => setViewList(false)}>Ajouter un article</button>
      </div>

      {viewList ? (
        <ul className="list">
          {articles.map(article => (
            <li key={article.id}>
              <span>{article.title} ({article.category?.name})</span>
              <div className="actions">
                <button onClick={() => toggleFavorite(article)}>
                  {article.isFavorite ? "⭐" : "☆"}
                </button>
                <button onClick={() => handleEdit(article)}>✏️</button>
                <button onClick={() => handleDelete(article.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <form className="form" onSubmit={e => { e.preventDefault(); handleAddOrUpdate(); }}>
          <input
            placeholder="Titre"
            value={newArticle.title}
            onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newArticle.description}
            onChange={e => setNewArticle({ ...newArticle, description: e.target.value })}
          />
          <select
            value={newArticle.categoryId}
            onChange={e => setNewArticle({ ...newArticle, categoryId: Number(e.target.value) })}
          >
            <option value="">Choisir une catégorie</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label>
            <input
              type="checkbox"
              checked={newArticle.isFavorite}
              onChange={e => setNewArticle({ ...newArticle, isFavorite: e.target.checked })}
            />
            Favori
          </label>
          <button type="submit">{newArticle.id ? "💾 Modifier" : "➕ Ajouter"}</button>
        </form>
      )}
    </div>
  );
}

