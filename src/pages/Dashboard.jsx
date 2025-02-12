import React, { useContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { InterviewContext } from "../context/InterviewContext";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { InputField } from "../shared/InputField";

const Dashboard = () => {
  const { interviews, deleteInterview, showCalender, setShowCalender } =
    useContext(InterviewContext);
  const [filters, setFilters] = useState({
    date: "",
    interviewer: "",
    candidate: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [updatedInterviews, setUpdatedInterviews] = useState(interviews);
  const navigate = useNavigate();

  // Sync state whenever interviews update
  useEffect(() => {
    setUpdatedInterviews([...interviews]);
  }, [interviews]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ date: "", interviewer: "", candidate: "" });
  };

  const handleDateChange = (date) => {
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    setSelectedDate(date);
    setFilters({ ...filters, date: formattedDate });
  };

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      return (
        (!filters.date || interview.date === filters.date) &&
        (!filters.interviewer ||
          interview.interviewer
            .toLowerCase()
            .includes(filters.interviewer.toLowerCase())) &&
        (!filters.candidate ||
          interview.candidate
            .toLowerCase()
            .includes(filters.candidate.toLowerCase()))
      );
    });
  }, [interviews, filters]);

  return (
    <div className="md:p-6 p-3 container mx-auto">
      <h1 className="md:text-2xl font-bold mb-4">Interview Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-top">
        <InputField
          type="text"
          name="interviewer"
          placeholder="Filter by Interviewer"
          value={filters.interviewer}
          onChange={handleFilterChange}
          className="capitalize"
        />
        <InputField
          type="text"
          name="candidate"
          placeholder="Filter by Candidate"
          value={filters.candidate}
          onChange={handleFilterChange}
          className="capitalize"
        />
        {!showCalender && (
          <span
            onClick={() => setShowCalender(!showCalender)}
            className="cursor-pointer h-fit p-1 rounded-md max-md:hidden"
          >
            <SlCalender size={24}/>
          </span>
        )}
        {showCalender && (
          <div className="bg-white shadow-md p-4 rounded-md max-md:hidden">
            <div className="flex justify-between ">
              <h2 className="text-lg font-semibold mb-3">Interview Calendar</h2>
              <span
                onClick={() => setShowCalender(!showCalender)}
                className="cursor-pointer font-medium"
              >
                X
              </span>
            </div>
            <div>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const formattedDate = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .split("T")[0];

                    if (
                      updatedInterviews.some(
                        (interview) => interview.date === formattedDate
                      )
                    ) {
                      return (
                        <div className="flex items-center justify-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-1 md:w-3 md:h-3"></span>
                        </div>
                      );
                    }
                  }
                  return null;
                }}
                className="p-2 text-sm sm:text-base md:text-lg"
              />
            </div>
          </div>
        )}

        {filters.candidate.length || filters.interviewer.length ? (
          <button
            onClick={clearFilters}
            className="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer bg-gray-700 text-white hover:bg-gray-800 transition"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div>
        <div>
          <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr className="border-b border-gray-400 text-center">
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap">
                  Candidate
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">
                  Interviewer
                </th>
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap">
                  Date
                </th>
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap">
                  Time
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">Type</th>
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="table-bg">
              {filteredInterviews.length === 0 ? (
                <tr className="text-gray-700 text-center border-b border-gray-300">
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No scheduled interviews
                  </td>
                </tr>
              ) : (
                filteredInterviews.map((interview) => (
                  <tr
                    key={interview.id}
                    className="text-gray-700 text-center border-b border-gray-300"
                  >
                    <td className="py-2 max-sm:px-2 px-4 font-medium capitalize">
                      {interview.candidate}
                    </td>
                    <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                      {interview.interviewer}
                    </td>
                    <td className="py-2 font-medium max-sm:px-2 px-4">
                      {interview.date}
                    </td>
                    <td className="py-2 font-medium max-sm:px-2 px-4">
                      {interview.time}
                    </td>
                    <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                      {interview.type}
                    </td>
                    <td className="py-2 max-sm:px-2 px-4 relative">
                      <div className="relative inline-block text-left group">
                        <button className="text-gray-500 action-button">
                          ...
                        </button>
                        <div className="hidden absolute z-10 right-4 sm:right-0 sm:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                          <button
                            onClick={() => navigate(`/edit/${interview.id}`)}
                            className="block w-full text-left px-4 py-2 cursor-pointer
                             text-blue-600 hover:bg-gray-100"
                          >
                            <FaEdit className="inline-block mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => deleteInterview(interview.id)}
                            className="block w-full text-left px-4 py-2 cursor-pointer
                             text-red-600 hover:bg-gray-100"
                          >
                            <RiDeleteBin5Fill className="inline-block mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
