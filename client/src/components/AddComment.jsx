import { useState } from "react";
import Button from "./ui/Button";

export default function AddComment({ handleAdd }) {
  const [body, setBody] = useState("");

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (body) {
      handleAdd(body);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="comment" id="comment" onChange={handleChange}></textarea>
      <Button text="Send" />
    </form>
  );
}
