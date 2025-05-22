export default function Button({ text, handleClick }) {
  return (
    <button style={{ cursor: "pointer" }} onClick={handleClick}>
      {text}
    </button>
  );
}
