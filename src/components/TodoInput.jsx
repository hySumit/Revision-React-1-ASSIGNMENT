import axios from "axios";
import React, { useState } from "react";

export const TodoInput = ({ handleAdd }) => {
  const [title, setTitle] = useState("");
  const [assign, setAssign] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      assign,
      date,
      time,
      status: false
    };

    handleAdd(newTodo);

    setTitle("");
    setAssign("");
    setDate("");
    setTime("");
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <label> Select </label>
        <select required
          name=""
          id=""
          onChange={(e) => setAssign(e.target.value)}
          value={assign}
        >
          <option value="">Assign To</option>
          <option value="Sumit">Sumit</option>
          <option value="Susanta">Susanta</option>
          <option value="Aman">Aman</option>
          <option value="Dikhya">Dikhya</option>
        </select>

        <label> Task </label>

        <input required
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Your Task"
          value={title}
        />

        <label>Time</label>
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
          placeholder="Complete it by the time"
        />

        <label>Date</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          placeholder="Complete it by the date"
        />

        <button type="submit">Create a new Todo</button>
      </form>
    </div>
  );
};
