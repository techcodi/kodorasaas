import ProfileDisplay from "./Settings/ProfileDisplay";
import SettingForm from "./Settings/SettingForm";
import { useState } from "react";
function Setting() {
  const [openProfileForm, setOpenProfileForm] = useState(false);

  return (
    <div style={{ marginTop: "7rem", textAlign: "center" }}>
      {openProfileForm && (
        <SettingForm
          openProfileForm={openProfileForm}
          setOpenProfileForm={setOpenProfileForm}
        />
      )}
      <ProfileDisplay setOpenProfileForm={setOpenProfileForm} />
    </div>
  );
}

export default Setting;
