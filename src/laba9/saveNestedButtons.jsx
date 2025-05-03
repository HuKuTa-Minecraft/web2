import React, { useRef } from "react";

const NestedButtons = () => {
  const innerRef = useRef();

  const handleOuterClick = () => {
    // Программно вызвать обработчик внутренней кнопки
    alert("Нажата внешняя кнопка");
    
  };

  const handleInnerClick = (e) => {
    // Остановим всплытие, чтобы внешний обработчик не срабатывал
    e.stopPropagation();
    alert("Нажата внутренняя кнопка");
  };

  return (
    <button onClick={handleInnerClick}>
      Внешняя кнопка
      <button
        ref={innerRef}
        onClick={handleOuterClick}
        style={{ marginLeft: 10 }}
      >
        Внутренняя кнопка
      </button>
    </button>
  );
};

export default NestedButtons;
