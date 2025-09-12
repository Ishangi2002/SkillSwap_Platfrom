import React, { useEffect, useState } from "react";
import axios from "axios";

export const CommunityFeedback = () => {
   const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/feedback");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <section className="py-8 px-6 text-center">
      <h2 className="text-4xl text-center text-white mb-30 mt-10">
        Community Feedback
      </h2>

      <div className="ml-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-30 place-items-center mt-[-20px]">
        {feedbacks.length === 0 ? (
          <p className="text-gray-400">No feedback yet.</p>
        ) : (
          feedbacks.map((feedback, i) => (
            <div
              key={i}
              className="bg-gray-800 w-96 h-48 p-6 rounded-3xl hover:shadow-lg transition flex flex-col justify-center mt-20"
            >
              <h3 className="text-base font-semibold mb-6 text-white mt-[-60px] flex items-center justify-start">
                {feedback.comment}
              </h3>
              <p className="text-gray-400 text-sm text-right">{feedback.username}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommunityFeedback;