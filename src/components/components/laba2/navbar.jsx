// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Главная</Link>
      <Link to="/about">Лабораторная 2</Link>
      <Link to="/labs">Лабораторная 3 </Link>
      <Link to="/hooks">useState и useEffect</Link>
      <Link to="/counter">Счётчик</Link>
      <Link to="/feedback">Обратная связь</Link>
      <Link to="/feedbacks">Отзывы</Link>
    </nav>
  );
}

export default Navbar;
