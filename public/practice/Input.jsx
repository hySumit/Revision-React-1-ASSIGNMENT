import React, { useEffect, useRef, useState } from "react";

const Input = () => {
  const [text, setText] = useState("");
  const inputRef = useRef();

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(inputRef);
  };

  const handleClick = (e) => {
    inputRef.current.focus();
    console.log(inputRef.current.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  
  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        placeholder="enter something"
      />

      <h3>{text}</h3>
      <button onClick={handleClick}>click Me</button>
    </div>
  );
};

export default Input;
