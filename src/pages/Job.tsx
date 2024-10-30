import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-4">Job Board</h2>
      <h3 className="font-bold text-xl mt-10 mb-4">Available Jobs</h3>
      <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.interviewId} className="p-4 rounded-lg shadow-md bg-gray-50">
            <h4 className="font-bold text-lg text-gray-800">{job.jobPosition}</h4>
            <p className="text-gray-600">{job.jobDescription}</p>
            <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
            <p className="text-gray-700"><strong>Experience:</strong> {job.experience}</p>
            <Link to={`/jobs/${job.interviewId}`}>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Start Interview
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
