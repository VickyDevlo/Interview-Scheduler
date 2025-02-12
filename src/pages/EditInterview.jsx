import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";
import { InputField } from "../shared/InputField";

const EditInterview = () => {
  const {
    interviews,
    updateInterview,
    availableTimeSlots,
    availabelInterviewer,
  } = useContext(InterviewContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const interviewToEdit = interviews.find((item) => item.id === id);
  const [formData, setFormData] = useState(
    interviewToEdit || {
      candidate: "",
      interviewer: "",
      date: "",
      time: "",
      type: "Technical",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInterview(formData);
    navigate("/dashboard");
  };

  if (!interviewToEdit) {
    return <p>Interview not found!</p>;
  }

  return (
    <div className="p-6 container mx-auto">
      <h1 className="md:text-2xl font-bold mb-4">Edit Interview</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Candidate Name"
          type="text"
          name="candidate"
          value={formData.candidate}
          readOnly
          className="capitalize bg-gray-100 cursor-not-allowed"
        />

        <select
          id="interviewer"
          name="interviewer"
          value={formData.interviewer}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded "
        >
          {availabelInterviewer.map((interviewer) => (
            <option key={interviewer} value={interviewer}>
              {interviewer}
            </option>
          ))}
        </select>
        <InputField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          readOnly
          className="bg-gray-100 cursor-not-allowed"
        />
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        >
          <option value="">Select a Time Slot</option>
          {availableTimeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <div>
          <label
            htmlFor="type"
            className="block font-medium max-md:text-sm text-gray-500 mb-1"
          >
            Interview Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            disabled
            className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white cursor-pointer px-4 py-2 rounded"
        >
          Update Changes
        </button>
      </form>
    </div>
  );
};

export default EditInterview;
