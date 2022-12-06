import React, { useState } from "react";
import { useEffect } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo.jsx";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  //해야 할 일을 담은 todos
  //const [todos, setTodos] = useState(readTodosFromLocalStroage()); --사용자가 동작 할 때 마다 매번 함수 호출됨
  //콜백함수로 전달하면, useState는 값을 기억하기 때문에 초기값이 필요할 때만 함수를 호출해서 사용함
  const [todos, setTodos] = useState(() => readTodosFromLocalStroage());
  // 새로운 todo를 todos에 업데이트
  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };
  //update가 되면 배열을 받아와서, 빙글빙글 돌면서 요소의 id가 update될 id랑 같다면 update해주고 아니면 기존 그대로를 유지
  const handleUpdate = (update) =>
    setTodos(todos.map((t) => (t.id === update.id ? update : t)));
  // deleted아닌것만 새로운 배열로 만들기
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
function readTodosFromLocalStroage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
