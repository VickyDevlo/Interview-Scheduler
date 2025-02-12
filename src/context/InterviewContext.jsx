import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const InterviewContext = createContext();

const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const availabelInterviewer = [
  "Ryan Carter",
  "Jonathan Smith",
  "David Patel",
  "Michael Thompson",
  "Andrew Reynolds",
  "Benjamin Hayes",
  "Christopher Nolan",
];

export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  const [showCalender, setShowCalender] = useState(false);

  useEffect(() => {
    const savedInterviews =
      JSON.parse(localStorage.getItem("interviews")) || [];
    setInterviews(savedInterviews);
  }, []);

  useEffect(() => {
    localStorage.setItem("interviews", JSON.stringify(interviews));
  }, [interviews]);

  const addInterview = (newInterview) => {
    setInterviews((prevInterviews) => {
      const existingInterview = prevInterviews.find(
        (i) =>
          i.candidate.toLowerCase() === newInterview.candidate.toLowerCase()
      );

      if (existingInterview) {
        const updatedInterviews = prevInterviews.map((i) =>
          i.candidate.toLowerCase() === newInterview.candidate.toLowerCase()
            ? { ...i, ...newInterview }
            : i
        );

        toast.success("Interview Rescheduled Successfully");
        return updatedInterviews;
      }

      const conflict = prevInterviews.some(
        (i) =>
          i.date === newInterview.date &&
          i.time === newInterview.time &&
          (i.interviewer === newInterview.interviewer ||
            i.candidate.toLowerCase() === newInterview.candidate.toLowerCase())
      );

      if (conflict) {
        toast.error(
          "Time slot already booked for this candidate or interviewer."
        );
        return prevInterviews;
      }

      toast.success("Interview Scheduled Successfully");
      return [...prevInterviews, newInterview];
    });
  };

  const updateInterview = (updatedInterview) => {
    setInterviews((prevInterviews) => {
      const existingIndex = prevInterviews.findIndex(
        (i) => i.id === updatedInterview.id
      );

      if (existingIndex === -1) {
        toast.error("Interview not found!");
        return prevInterviews;
      }

      const conflict = prevInterviews.some(
        (i) =>
          i.id !== updatedInterview.id &&
          i.date === updatedInterview.date &&
          i.time === updatedInterview.time &&
          (i.interviewer === updatedInterview.interviewer ||
            i.candidate === updatedInterview.candidate)
      );

      if (conflict) {
        toast.error(
          "Time slot already booked for this candidate or interviewer."
        );
        return prevInterviews;
      }

      const updatedInterviews = [...prevInterviews];
      updatedInterviews[existingIndex] = updatedInterview;

      toast.success("Interview Updated Successfully");
      return updatedInterviews;
    });
  };

  const deleteInterview = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!isConfirmed) return;
    setInterviews(interviews.filter((interview) => interview.id !== id));
    toast.error("Interview deleted successfully");
  };

  return (
    <InterviewContext.Provider
      value={{
        interviews,
        addInterview,
        updateInterview,
        showCalender,
        setShowCalender,
        deleteInterview,
        availableTimeSlots,
        availabelInterviewer,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
