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
    <>
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          id="comment"
          onChange={handleChange}
        ></textarea>
        <Button text="Send" className="btn-primary" />
      </form>
    </>
  );
}
