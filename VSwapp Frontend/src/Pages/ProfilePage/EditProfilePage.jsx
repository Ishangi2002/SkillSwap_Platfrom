import React, { useEffect, useState } from "react";
import Navbar2 from "../../Components/Navbar2";
import axios from "axios";

const EditProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user and user details together
        const [userRes, detailsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8080/api/user-details/by-user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Set state
        setEmail(userRes.data.email);
        setPassword(userRes.data.password); 
        setFirstName(detailsRes.data.firstname);
        setLastName(detailsRes.data.lastname);
        setUser(userRes.data);
        
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [userId, token]);

  // Save handlers
  const handleSaveName = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/user-details/by-user/${userId}`,
        { firstname: firstName, lastname: lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Name updated successfully!");
      
    } catch (err) {
      console.error(err);
      alert("Failed to update name");
    }
  };

  const handleSaveEmail = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Email updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update email");
    }
  };

  const handleSavePassword = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully!");
      setPassword(""); // clear after saving
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#090e2d] to-[#111827] min-h-screen text-white">
      <Navbar2 user={user}/>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
        <h1 className="text-3xl font-semibold mb-8">Edit Profile</h1>

        <div className="w-full max-w-xl space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-2 text-lg">First Name</label>
            <div className="flex">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-grow p-3 rounded-l-lg bg-blue-950 text-white"
              />
              <button
                onClick={handleSaveName}
                className="bg-blue-900 hover:bg-blue-700 px-6 rounded-r-lg"
              >
                Save
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Last Name</label>
            <div className="flex">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="flex-grow p-3 rounded-l-lg bg-blue-950 text-white"
              />
              <button
                onClick={handleSaveName}
                className="bg-blue-900 hover:bg-blue-700 px-6 rounded-r-lg"
              >
                Save
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-lg">Email</label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow p-3 rounded-l-lg bg-blue-950 text-white"
              />
              <button
                onClick={handleSaveEmail}
                className="bg-blue-900 hover:bg-blue-700 px-6 rounded-r-lg"
              >
                Save
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-lg">New Password</label>
            <div className="flex">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="flex-grow p-3 rounded-l-lg bg-blue-950 text-white"
              />
              <button
                onClick={handleSavePassword}
                className="bg-blue-900 hover:bg-blue-700 px-6 rounded-r-lg"
              >
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
