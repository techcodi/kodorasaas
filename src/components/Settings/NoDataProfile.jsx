import "./ProfileDisplay.css";

export default function NoDataProfile({ setOpenProfileForm }) {
  return (
    <div
      className="profile-display"
      style={{ textAlign: "left", marginTop: "-7rem" }}
    >
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Profile</h2>
        <span
          onClick={() => setOpenProfileForm(true)}
          style={{
            border: "2px dashed #4b5563",
            padding: "5px 20px",
            cursor: "pointer",
          }}
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </span>
      </div>

      <div className="profile-head">
        <img
          src=""
          alt=""
          style={{ width: 100, height: 100, borderRadius: "50%" }}
        />

        <div className="profile-details">
          <h3 style={{ textAlign: "left" }}>@</h3>
          <p style={{ textAlign: "left" }}></p>
          <p
            style={{
              textAlign: "left",
              textTransform: "capitalize",
              color: "#4b5563",
            }}
          ></p>
        </div>
      </div>

      <h2>Personal Information</h2>
      <div className="setting-info">
        <div>
          {" "}
          <h4>Username</h4>
        </div>
        <div>
          <h4>Bio</h4>
        </div>
        <div>
          <h4>Address</h4>
          <p></p>
        </div>
        <div>
          <h4>Website</h4>
        </div>
        <div>
          <h4>Email</h4>
        </div>
      </div>
    </div>
  );
}
