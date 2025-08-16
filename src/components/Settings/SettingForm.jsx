import { useState, useEffect } from "react";
import supabase from "../../services/supabase";
import "./SettingForm.css";

function SettingForm({ setOpenProfileForm }) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    city: "",
    country: "",
    website: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load existing profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        console.error("Auth error:", userError);
        return;
      }
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        return;
      }

      if (data) {
        setUserData({
          username: data.username || "",
          email: data.email || "",
          bio: data.bio || "",
          city: data.city || "",
          country: data.country || "",
          website: data.website || "",
        });
      }
    };

    fetchProfile();
  }, []);

  // Handle text field changes
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload avatar to Supabase storage
  const uploadAvatar = async (userId) => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  };

  // Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.error(userError);
      setLoading(false);
      return;
    }
    if (!user) {
      alert("Not logged in");
      setLoading(false);
      return;
    }

    try {
      console.log("Starting profile update...");
      const avatarUrl = await uploadAvatar(user.id);
      console.log("Avatar URL:", avatarUrl);

      if (userData.email !== user.email) {
        console.log("Updating auth email...");
        const { error: emailError } = await supabase.auth.updateUser({
          email: userData.email,
        });
        if (emailError) throw emailError;
      }

      console.log("Upserting profile...");
      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: user.id,
        ...userData,
        avatar_url: avatarUrl || undefined,
        updated_at: new Date(),
      });

      if (upsertError) throw upsertError;

      alert("Profile updated!");
      setOpenProfileForm(false);
    } catch (err) {
      console.error("Profile update error:", err);
      alert(`Error updating profile: ${err.message || err}`);
    }
  };

  return (
    <div className="setting-modal">
      <div className="setting-form">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={userData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              name="bio"
              id="bio"
              value={userData.bio}
              placeholder="Daily searching for the best"
              onChange={handleChange}
            />
          </div>

          <div className="form-groups">
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Lagos"
                value={userData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Nigeria"
                value={userData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                placeholder="https://myportfolio.com"
                value={userData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="setting-btns">
            <button
              type="button"
              className="setting-primary-btn"
              onClick={() => setOpenProfileForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="setting-secondary-btn"
              disabled={loading}
            >
              {loading ? (
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingForm;
