import React, { useState, useEffect } from "react";
import AddJob from "./../components/AddJob";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from Flask backend
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs"); // Adjust endpoint if necessary
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Handle adding a job (update to work with backend)
  const handleAddJob = async (newJob) => {
    // Ensure job data matches the fields expected by the backend
    const jobData = {
      jobPosition: newJob.jobPosition,
      jobDescription: newJob.jobDescription,
      location: newJob.location,
      salary: newJob.salary,
      experience: newJob.experience,
    };

    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      if (response.ok) {
        const createdJob = await response.json();
        setJobs((prevJobs) => [...prevJobs, createdJob]);
      } else {
        console.error("Failed to add job:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Job Board</h2>
      <p className="text-gray-600 mb-8">Add new jobs below:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AddJob onAddJob={handleAddJob} /> {/* Pass the add job function */}

        <div className="md:col-span-2 p-6 rounded-lg shadow-md bg-white">
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Current Job Listings</h3>
          {jobs.length > 0 ? (
            <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 rounded-lg shadow-md bg-gray-50">
                  <h4 className="font-bold text-lg text-gray-800">{job.jobPosition}</h4>
                  <p className="text-gray-600">Job Description: {job.jobDescription}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
                  <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
                  <p className="text-gray-700"><strong>Experience:</strong> {job.experience}</p>
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Edit Job
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No job listings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
