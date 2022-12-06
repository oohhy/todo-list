import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddTodo.module.css";
// 사용자에게 입력을 받아서 그 입력이 올바른지 아닌지 검사하는 로직
export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  // 이벤트 대상인 text를 input의 value로 지정
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    //아무것도 입력 안했을때는 추가 X
    if (text.trim().length === 0) {
      return;
    }
    //submit->onAdd=> handleAdd({ id: "고유한 값", text, status: "active" })실행
    //handleAdd는 prop으로 받은 콜백함수
    onAdd({ id: uuidv4(), text, status: "active" });
    //추가 한 뒤 input창 초기화
    setText("");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
