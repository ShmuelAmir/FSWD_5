export default function UserInfo({ user }) {
  return (
    <div className="card">
      <h3>My Information</h3>
      <div className="info-cnotent">
        <div className="info-section">
          <h4>Basic</h4>
          <p>
            <b>Full Name:</b> {user.name || "-"}
          </p>
          <p>
            <b>Email:</b> {user.email || "-"}
          </p>
          <p>
            <b>Phone:</b> {user.phone?.split(" ")[0] || "-"}
          </p>
        </div>

        <div className="info-section">
          <h4>Address</h4>
          <p>
            <b>Street:</b> {user.address?.street || "-"}
          </p>
          <p>
            <b>Suite:</b> {user.address?.suite || "-"}
          </p>
          <p>
            <b>City:</b> {user.address?.city || "-"}
          </p>
          <p>
            <b>Zipcode:</b> {user.address?.zipcode || "-"}
          </p>
        </div>

        <div className="info-section">
          <h4>Company</h4>
          <p>
            <b>Name:</b> {user.company?.name || "-"}
          </p>
          <p>
            <b>Catch Phrase:</b> {user.company?.catchPhrase || "-"}
          </p>
          <p>
            <b>BS:</b> {user.company?.bs || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
