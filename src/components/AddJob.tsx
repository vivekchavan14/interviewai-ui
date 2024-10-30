import React, { useState } from "react";

const AddJob = ({ onAddJob }) => {
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

  const handleAddJob = () => {
    const newJob = {
      interviewId: Math.random(), // For demonstration purposes only
      jobPosition,
      jobDescription,
      location,
      salary,
      experience,
    };
    
    // Call the parent function to add job
    onAddJob(newJob);

    // Clear the form
    setJobPosition("");
    setJobDescription("");
    setLocation("");
    setSalary("");
    setExperience("");
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h4 className="font-semibold text-lg mb-4">Add a New Job</h4>
      <input
        type="text"
        placeholder="Job Position"
        value={jobPosition}
        onChange={(e) => setJobPosition(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <button onClick={handleAddJob} className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
        Add Job
      </button>
    </div>
  );
};

export default AddJob;
