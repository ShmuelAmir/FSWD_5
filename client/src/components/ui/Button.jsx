export default function Button({ text, handleClick, ...props }) {
  return (
    <button onClick={handleClick} {...props}>
      {text}
    </button>
  );
}
