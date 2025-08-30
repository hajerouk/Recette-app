// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Articles from "./Pages/Articles";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
