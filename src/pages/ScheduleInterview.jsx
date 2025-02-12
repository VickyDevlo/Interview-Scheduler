import React, { useContext, useState } from "react";
import { InterviewContext } from "../context/InterviewContext";
import { InputField } from "../shared/InputField"; 

const ScheduleInterview = () => {
  const {
    addInterview,
    interviews,
    availableTimeSlots,
    availabelInterviewer,
  } = useContext(InterviewContext);

  const [formData, setFormData] = useState({
    candidate: "",
    interviewer: "",
    date: "",
    time: "",
    type: "Technical",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingInterview = interviews.find(
      (interview) =>
        interview.candidate.toLowerCase() === formData.candidate.toLowerCase()
    );

    if (existingInterview) { 
      addInterview({ ...existingInterview, ...formData });
    
    } else { 
      addInterview({ id: Date.now().toString(), ...formData }); 
    }
 
    setFormData({
      candidate: "",
      interviewer: "",
      date: "",
      time: "",
      type: "Technical",
    });
  };

  const isDisabled =
    !formData.candidate ||
    !formData.date ||
    !formData.interviewer ||
    !formData.time ||
    !formData.type;

  return (
    <div className="md:p-6 p-3 container mx-auto">
      <h1 className="md:text-2xl font-bold mb-4 ">Schedule Interview</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          name="candidate"
          placeholder="Candidate Name"
          value={formData.candidate}
          onChange={handleChange}
          className="border p-2 capitalize w-full"
        />

        <select
          id="interviewer"
          name="interviewer"
          value={formData.interviewer}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
        >
          <option value="">Select the Interviewer</option>
          {availabelInterviewer.map((interviewer) => (
            <option key={interviewer} value={interviewer}>
              {interviewer}
            </option>
          ))}
        </select>
        <InputField
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
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
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full"
        >
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
        </select>
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded
           disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterview;
