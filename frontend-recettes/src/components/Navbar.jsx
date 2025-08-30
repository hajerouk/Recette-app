// Navbar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="logo">🍴 Gestion Recettes</div>
      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Accueil</Link>
        <Link className={location.pathname === "/categories" ? "active" : ""} to="/categories">Catégories</Link>
        <Link className={location.pathname === "/articles" ? "active" : ""} to="/articles">Articles</Link>
      </div>
    </nav>
  );
}
