// src/components/Content.jsx
import React from "react";
import { useLocation } from "react-router-dom";  //для получения текущего пути

export default function Content() {
  const location = useLocation();  //получаю текущий путь

  let content;
  switch (location.pathname) {
    case "/":
      content = <div>Главная страница</div>;
      break;
    case "/about":
      content = <div>2 страница</div>;
      break;
    case "/labs":
      content = <div>Лабораторные работы</div>;
      break;
    case "/hooks":
      content = <div>Пример с хуками</div>;
      break;
    case "/page1":
      content = <div>Страница 1</div>;
      break;
    case "/page2":
      content = <div>Страница 2</div>;
      break;
    default:
      content = <div>Страница не найдена</div>;
  }

  return <div>{content}</div>;
}
