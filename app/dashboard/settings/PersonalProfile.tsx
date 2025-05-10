import { useState, useEffect } from "react";

export default function PersonalProfile() {
  const [profilePic, setProfilePic] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    gender: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/setting/profile");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setFormData({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          address: data.address,
          gender: data.gender,
        });
        setProfilePic(data.profilePicture);
      } catch (error: any) {
        setError(error.message);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fileData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setProfilePic(data.imageUrl);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/setting/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, profilePicture: profilePic }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Personal Profile</h2>
      
      <div className="flex flex-col items-center gap-4">
        <img
          src={profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        {isEditing && (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg">
              {uploading ? "Uploading..." : "Upload Picture"}
            </label>
          </>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {!isEditing ? (
        <div className="mt-4 space-y-2">
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <button
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="block">
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="p-2 border rounded w-full"
            />
          </label>

          <label className="block">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="p-2 border rounded w-full"
            />
          </label>

          <label className="block">
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="p-2 border rounded w-full"
            />
          </label>

          <label className="block">
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </label>

          <label className="block">
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="p-2 border rounded w-full"
            />
          </label>

          <label className="block">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <button
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
            onClick={handleUpdateProfile}
            disabled={uploading}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
