import React, { useState, useEffect } from 'react';
import FilterBox from './FilterBox';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SkillCatalog = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/skill");
        setSkills(res.data);
        setFilteredSkills(res.data); 
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  // Update filtered skills whenever filters change
  useEffect(() => {
    let filtered = skills;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(skill => selectedCategories.includes(skill.category));
    }

    if (selectedLevels.length > 0) {
      filtered = filtered.filter(skill => selectedLevels.includes(skill.level));
    }

    setFilteredSkills(filtered);
  }, [selectedCategories, selectedLevels, skills]);

  return (
    <section className="py-16">
      <div className="bg-gradient-to-b from-[#090e2d] to-[#111827] min-h-screen text-white">
        <div className="text-3xl text-center text-white">
          <h4>Skills Catalog</h4>
          <hr className="w-[80px] border-t-2 border-blue-500 mx-auto mt-3" />
        </div>

        <div className="flex ml-24 mt-8 gap-8">
          {/* Filter Box */}
          <div className="bg-indigo-950 text-white p-8 rounded-3xl shadow-lg w-[350px] h-[650px] flex-shrink-0">
            <FilterBox
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedLevels={selectedLevels}
              setSelectedLevels={setSelectedLevels}
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-indigo-950 text-white rounded-3xl shadow-lg w-[320px] h-[250px] flex flex-col justify-between"
              >
                <img
                  src={skill.imagePath}
                  alt={skill.title}
                  className="w-full h-[180px] rounded-3xl object-cover"
                />
                <div className="flex justify-between items-center px-4 py-2 ">
                  <span className="text-base">{skill.title}</span>
                  <Link to="/contact"><span className="text-base cursor-pointer">Join</span></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillCatalog;
