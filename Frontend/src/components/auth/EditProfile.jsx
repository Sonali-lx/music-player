import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  setError,
  setLoading,
  setUser,
} from "../../redux/slice/authSlice";
import axios from "axios";
import "../../css/auth/EditProfile.css";
import { CiUser } from "react-icons/ci";
import Input from "../common/input";

const EditProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // update Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [previewImage, setPreviewImage] = useState(user?.avatar || "");
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPreviewImage(user.avatar || "");
    }
  }, [user]);

  //   For Imagekit : raw image -> base 64 image

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // getting a file, when this event occo=urs

    if (!file) return;

    const reader = new FileReader(); // like in java
    reader.readAsDataURL(file); // the data that is read is converted into URL

    reader.onloadend = () => {
      setPreviewImage(reader.result); // URL will be returned and it will be kept for thr preview image
      setBase64Image(reader.result);
    };
  };

  //   submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const payload = {};

    if (name && name !== user.name) payload.name = name;
    if (email && email !== user.email) payload.email = email;
    if (base64Image && base64Image !== user.avatar)
      payload.avatar = base64Image;
    // if new ones are same as the before once, then no need to call an api

    if (showPasswordFields) {
      if (!currentPassword || !newPassword) {
        dispatch(setError("To change Password, both fields are required"));
        return;
      }
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    if (Object.keys(payload).length === 0) {
      dispatch(setError("No changes to update"));
      return;
    }

    dispatch(setLoading(true));
    const storedToken = token || localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      const data = response.data || {};

      dispatch(
        setUser({
          user: data.user,
          token: token || localStorage.getItem("token"),
        }),
      );

      if (onClose) {
        dispatch(clearError());
        onClose();
      }
      console.log("Profile updated successfully:");
    } catch (error) {
      let serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      dispatch(
        setError(serverMessage || "Profile update failed! Please try again"),
      );
      console.log("Error updating profile:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="editprofile-wrapper">
      <h3 className="editprofile-title">Edit Profile</h3>
      <p>Update your account Details</p>

      <form className="editprofile-form" onSubmit={handleSubmit}>
        {!showPasswordFields && (
          <>
            <div className="profile-image-container">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">
                  <CiUser size={40} />
                </div>
              )}

              <label className="image-upload-icon">
                📸
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>

            <Input
              label={"Name"}
              type="text"
              placeholder={"Update your name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label={"Email"}
              type="email"
              placeholder={"Update your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        {showPasswordFields && (
          <>
            <Input
              label={"Current Password"}
              type={"password"}
              placeholder={"Enter current password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label={"New Password"}
              type={"password"}
              placeholder={"Enter new password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </>
        )}
        {error && <div className="edit-profile-error">{error}</div>}
        <button
          type="submit"
          className="editprofile-password-toggle"
          onClick={() => setShowPasswordFields(!showPasswordFields)}
        >
          {showPasswordFields ? "Cancel Password Change" : "Change password"}
        </button>
        <div className="editprofile-action">
          <button
            type="button"
            className="editprofile-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button className="editprofile-btn-submit" type="button">
            {isLoading ? "Saving... " : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
