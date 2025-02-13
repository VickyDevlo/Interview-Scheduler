import React, { useContext, useState, useMemo, useEffect, useRef } from "react";
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    setUpdatedInterviews([...interviews]);
  }, [interviews]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ date: "", interviewer: "", candidate: "" });
    setSelectedDate(new Date());
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

  const handleResetCalendar = () => {
    setFilters({ date: "", interviewer: "", candidate: "" });
    setShowCalender(!showCalender);
    setSelectedDate(new Date());
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.values(dropdownRefs.current).forEach((ref, id) => {
        if (ref && !ref.contains(event.target)) {
          setOpenDropdown((prev) => (prev === id ? null : prev));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="md:p-6 p-3 container mx-auto">
      <h1 className="md:text-2xl font-bold mb-4">Interview Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-top">
        <InputField
          type="text"
          name="candidate"
          placeholder="Filter by Candidate"
          value={filters.candidate}
          onChange={handleFilterChange}
          className="capitalize"
        />
        <InputField
          type="text"
          name="interviewer"
          placeholder="Filter by Interviewer"
          value={filters.interviewer}
          onChange={handleFilterChange}
          className="capitalize"
        />
        {!showCalender && (
          <span
            onClick={() => setShowCalender(!showCalender)}
            className="cursor-pointer h-fit p-1 rounded-md max-md:hidden"
          >
            <SlCalender size={24} />
          </span>
        )}
        {showCalender && (
          <div className="bg-white shadow-md p-4 rounded-md max-md:hidden">
            <div className="flex justify-between ">
              <h2 className="text-lg font-semibold mb-3">Interview Calendar</h2>
              <span
                onClick={handleResetCalendar}
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
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">Sr.No.</th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:text-xs sm:whitespace-nowrap">
                  Candidate
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">
                  Interviewer
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:text-xs sm:whitespace-nowrap">
                  Date
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:text-xs sm:whitespace-nowrap">
                  Time
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">Type</th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:text-xs sm:whitespace-nowrap">
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
                filteredInterviews.map((interview, index) => (
                  <tr
                    key={interview.id}
                    className="text-gray-700 text-center border-b border-gray-300"
                  >
                     <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                      {index + 1}
                    </td>
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
                    <td className="py-2 max-sm:px-2 px-4 font-medium relative">
                      <div
                        ref={(el) => (dropdownRefs.current[index] = el)}
                        className="relative inline-block text-left"
                      >
                        <button
                          onClick={() =>
                            setOpenDropdown((prev) =>
                              prev === index ? null : index
                            )
                          }
                          className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md focus:outline-none cursor-pointer"
                        >
                          &#x22EE;
                        </button>

                        {openDropdown === index && (
                          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                            <button
                              onClick={() => {
                                navigate(`/edit/${interview.id}`);
                                setOpenDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                            >
                              <FaEdit className="mr-2" /> Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteInterview(interview.id);
                                setOpenDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <RiDeleteBin5Fill className="mr-2" /> Delete
                            </button>
                          </div>
                        )}
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
