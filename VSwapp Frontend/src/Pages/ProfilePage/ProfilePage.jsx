import React, { useEffect, useState } from "react";
import Navbar2 from "../../Components/Navbar2";
import profileBackground from "../../assets/Images/profileBackground.jpg";
import userImage from "../../assets/Images/user.jpg";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Footer } from "../../Components/Footer";
import axios from "axios";

export const ProfilePage = () => {
  const [skills, setSkills] = useState([]);
   const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const userId = localStorage.getItem("userId");  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSkills = async () => {
      if (!userId) {
    setError("User ID not found. Please log in again.");
    setLoading(false);
    return;
  }
  console.log("Token:", token); 
  if (!token) {
  window.location.href = "/login";
  return;
}
     //get skills by userid 
    try {
        const response = await axios.get(`http://localhost:8080/api/skill/user/${userId}`,
          {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      }
    );
        setSkills(response.data); 
      } catch (err) {
        console.error("Error fetching skills:",err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

//get userdetails by userid

     const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user-details/by-user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchSkills();
    fetchUserDetails();
  }, [userId,token]);

  //delete user
  const handleDeleteUser = async () => {
  if (!window.confirm("Are you sure you want to delete your account?")) return;

  try {
    await axios.delete(`http://localhost:8080/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("User deleted successfully");
    localStorage.clear(); 
    window.location.href = "/"; 
  } catch (err) {
    console.error("Failed to delete user:", err);
    alert("Failed to delete user. Please try again.");
  }
};

  

  //Delete skill
  const handleDelete = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/skill/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

  // Update UI without reload
      setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Failed to delete skill. Please try again.");
    }
  };

  //Add feedback
  const handleAddFeedback = async () => {
  if (!feedbackText.trim()) {
    alert("Please enter feedback before submitting.");
    return;
  }

  if (!user) {
    alert("User details not loaded. Please wait a moment.");
    return;
  }

  try {
    await axios.post("http://localhost:8080/api/feedback", 
      {
        comment: feedbackText,
        userId:userId
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Feedback submitted successfully!");

    setFeedbackText(""); 

  } catch (err) {
    console.error("Error submitting feedback:", err);
    alert("Failed to submit feedback. Try again.");
  }
};

  return (
    <div className="bg-gradient-to-b from-[#090e2d] to-[#111827] min-h-screen text-white">
      <Navbar2 user={user} />

      {/* Background */}
      <div className="flex items-center justify-center mt-20 mb-24">
        <div className="relative bg-blue-950 p-0 rounded-3xl w-[1280px] h-[500px] shadow-lg">
          <img
            src={profileBackground}
            alt="profile"
            className="w-full h-[300px] object-cover rounded-t-3xl mt-[-24px]"
          />

          {/* Profile image */}
          <div className="absolute left-10 top-[200px]">
            <img
              src={userImage}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>

          {/* Edit & Delete Icons */}
          <div className="absolute top-[300px] right-5 flex space-x-3">
            <Link to="/editprofile">
              <button className="p-2 rounded-full">
                <PencilSquareIcon className="w-6 h-6 text-white" />
              </button>
            </Link>

            <button className="bg-red-500 p-2 rounded-full" onClick={handleDeleteUser}>
              <TrashIcon className="w-6 h-6 text-white" />
            </button>

          </div>
          <div className="absolute left-10 top-[380px]">
            <h2 className="text-xl font-semibold"> {user ? `${user.firstname} ${user.lastname}` : "Loading..."}</h2>
            <p className="text-white text-sm">{user?.email || ""}</p>
            <Link to="/login" className="text-white text-sm underline">
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Motivational text */}
      <div className="text-bold text-5xl font-mono">
        <span className="ml-48 text-white">You're not</span>{" "}
        <span className="text-blue-600">just </span>
        <span className="text-white">growing here;</span>
        <p className="ml-48">
          your talents are shining <span className="text-blue-600">worldwide!</span>{" "}
        </p>
      </div>
      

      {/* Published Skills */}
      <div className="flex items-center justify-center mt-20 mb-32">
        <div className="relative bg-blue-950 p-0 rounded-3xl w-[1280px] min-h-[700px] pb-32 shadow-lg">
          <p className="mt-8 ml-10 text-2xl">Published skills</p>
          <p className="ml-10 text-lg text-gray-400">{skills.length} skills</p>

          <div className="flex flex-wrap ml-20 items-stretch gap-32 px-10 mt-10">
            {loading ? (
              <p>Loading skills...</p>
            ) : error ? (
              <p>{error}</p>
            ) : skills.length === 0 ? (
              <p className="ml-6">No skills published yet.</p>
            ) : (
              skills.map((skill) => (
                
                <div
                  key={skill.id}
                  className="flex flex-col border border-blue-900 bg-blue-950 rounded-3xl w-[450px] shadow-2xl min-h-[420px] h-full"
                >
                  <span className="text-lg ml-6 mt-4 block">{skill.title}</span>
                  {skill.imagePath ? (
                    <img
                      src={skill.imagePath}
                      alt={skill.title}
                      className="w-full h-[250px] object-cover rounded-b-3xl mt-[10px]"
                    />
                  ):(
                    <div className="w-full h-[200px] bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
                  </div>
                  )}
                  <div className="ml-5 mt-5 flex-1">
                    <span>{skill.about}</span>
                  </div>
                  <div className="flex justify-end mt-auto mb-4 mr-4 space-x-2">
                    <Link to={`/updateskill/${skill.id}`}>
                      <button className="p-2 rounded-full">
                        <PencilSquareIcon className="w-6 h-6 text-white" />
                      </button>
                    </Link>

                    <button className="bg-red-500 p-2 rounded-full">
                      <TrashIcon className="w-6 h-6 text-white" onClick={() => handleDelete(skill.id)} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Skill button */}
          <Link to="/addskill">
            <button className="absolute bottom-8 right-[50px] flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
              <span className="text-5xl">+</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Feedback */}
      <div className="flex items-center justify-center">
        <span className="text-2xl mt-[-40px]">
          Let's build a better space together - drop your feedback anytime.
        </span>
      </div>

      <div className="flex items-center justify-center mt-10 mb-32">
        <div className="relative bg-blue-950 p-6 rounded-3xl w-[1280px] h-[280px] shadow-lg text-white">

          <textarea
            id="feedback"
            rows="5"
            className="w-full p-4 rounded-lg text-white bg-blue-950 shadow-2xl focus:outline-none"
            placeholder="Drop your feedback here..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>

          <div className="flex justify-center mt-4">
            <Link to="/">
              <button onClick={handleAddFeedback} 
              className="w-96 bg-blue-800 hover:bg-indigo-800 text-white rounded-lg p-3 text-lg ">
                Add your feedback
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
