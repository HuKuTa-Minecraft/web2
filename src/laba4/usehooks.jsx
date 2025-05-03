import React, { useState, useEffect } from "react";
import Container from "C:/Projects/ssvr/labs/src/components/components/laba2/container.jsx";

export default function UseHooksPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Привет!");

  useEffect(() => {
    return () => {
      console.log("Компонент размонтирован!");
      console.log(count)
    };
  }, [count]);

  useEffect(() => {
    console.log("Компонент смонтирован!");
    console.log(count)
  }, [count]);
  
  useEffect(() => {
    console.log("Компонент обновился!");
    // console.log(count)
  }, [count, message]);
  
  function handleClick(){
    setCount(count + 1)
  }

  return (
    <Container>
      <h2>useState и useEffect</h2>
      <button onClick={(handleClick)}>Изменить сообщение</button>
      <p>{message}</p>
    </Container>
  );
}
