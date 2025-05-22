export default function UserInfo({ user }) {
  return (
    <div className="user-info-card">
      <h3>My Information</h3>
      <p>
        <b>Full Name:</b> {user.name || "-"}
      </p>
      <p>
        <b>Email:</b> {user.email || "-"}
      </p>
      <p>
        <b>Phone:</b> {user.phone}
      </p>
    </div>
  );
}
