import Button from "./ui/Button";

export default function AddComment() {
  return (
    <form>
      <textarea name="comment" id="comment"></textarea>
      <Button text="Send" />
    </form>
  );
}
