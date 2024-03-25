import React, { useState, useEffect } from "react";
import axios from "axios";

export const TodoItem = ({ id, title, assign, date, time, status, handleUpdate, handleDelete }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAssign, setUpdatedAssign] = useState(assign);
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedTime, setUpdatedTime] = useState(time);

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterAssignee, setFilterAssignee] = useState("All");

  useEffect(() => {
    setUpdatedTitle(title);
    setUpdatedAssign(assign);
    setUpdatedDate(date);
    setUpdatedTime(time);
  }, [title, assign, date, time]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/todos/${id}`, {
        title: updatedTitle,
        assign: updatedAssign,
        date: updatedDate,
        time: updatedTime,
        status: status
      });
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = () => {
    if (filterStatus === "All" && filterAssignee === "All") {
      return true;
    }
    if (filterStatus !== "All" && status !== (filterStatus === "completed")) {
      return false;
    }
    if (filterAssignee !== "All" && assign !== filterAssignee) {
      return false;
    }
    return true;
  };

  const renderEditForm = (
    <form onSubmit={handleUpdateSubmit}>
      <label>
        Assign:
        <select
          name="assignee"
          id="assignee"
          value={updatedAssign}
          onChange={(e) => setUpdatedAssign(e.target.value)}
        >
          <option value="Sumit">Sumit</option>
          <option value="Susanta">Susanta</option>
          <option value="Aman">Aman</option>
          <option value="Dikhya">Dikhya</option>
        </select>
      </label>
      <label>
        Task:
        <input
          type="text"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          name="time"
          value={updatedTime}
          onChange={(e) => setUpdatedTime(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );

  return (
    <div>
      <div className="select">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div className="select">
        <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)}>
          <option value="All">All</option>
          <option value="Sumit">Sumit</option>
          <option value="Susanta">Susanta</option>
          <option value="Aman">Aman</option>
          <option value="Dikhya">Dikhya</option>
        </select>
      </div>
      {filtered() && (
        !editing ? (
          <>
            <h3>Task assigned To: <span>{assign} </span> </h3>
            <p>
              <span>Task: </span> {title}
            </p>
            <p>
              <span> Completion Time: </span> {time}
            </p>
            <p>{status ? "Completed" : "Pending"}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <button onClick={() => handleUpdate(id, status)}>{status ? "Incomplete" : "Complete"}</button>
          </>
        ) : renderEditForm
      )}
    </div>
  );
};
