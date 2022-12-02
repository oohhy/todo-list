import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";

export default function TodoList() {
  //해야 할 일을 담은 todos
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "공부하기", status: "active" },
  ]);
  const handleAdd = (todo) => {
    // 새로운 todo를 todos에 업데이트
    setTodos([...todos, todo]);
  };
  return (
    <section>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
