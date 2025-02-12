import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";

const ManageInterview = () => {
  const { interviews, ManageInterview } = useContext(InterviewContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const interviewToEdit = interviews.find((item) => item.id === id);

  const [formData, setFormData] = useState(interviewToEdit || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ManageInterview(formData);
    navigate("/dashboard");
  };

  if (!interviewToEdit) {
    return <p>Interview not found!</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Interview</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="candidate" value={formData.candidate} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="interviewer" value={formData.interviewer} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default ManageInterview;
