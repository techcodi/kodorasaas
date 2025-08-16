import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import "./ProfileDisplay.css";
import NoDataProfile from "./NoDataProfile";
import Loader from "../../components/Loader";

export default function ProfileDisplay({ setOpenProfileForm }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    try {
      setLoading(true);

      // Get the logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) return;

      // Get the user's profile from the database
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loader />;
  if (!profile)
    return <NoDataProfile setOpenProfileForm={setOpenProfileForm} />;
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
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={`${profile.username}'s avatars`}
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        )}

        <div className="profile-details">
          <h3 style={{ textAlign: "left" }}>@{profile.username}</h3>
          <p style={{ textAlign: "left" }}>{profile.bio}</p>
          <p
            style={{
              textAlign: "left",
              textTransform: "capitalize",
              color: "#4b5563",
            }}
          >
            {profile.city}, {profile.country}
          </p>
        </div>
      </div>

      <h2>Personal Information</h2>
      <div className="setting-info">
        <div>
          {" "}
          <h4>Username</h4>
          <p>{profile.username}</p>
        </div>
        <div>
          <h4>Bio</h4>
          <p>{profile.bio}</p>
        </div>
        <div>
          <h4>Address</h4>
          <p>
            {profile.city}, {profile.country}
          </p>
        </div>
        <div>
          <h4>Website</h4>
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              {profile.website}
            </a>
          )}
        </div>
        <div>
          <h4>Email</h4>
          <p>{profile.email}</p>
        </div>
      </div>
    </div>
  );
}
