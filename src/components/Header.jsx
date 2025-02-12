import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-52 h-screen border-r border-gray-100">
      <nav className="container mx-auto">
        <ul className="flex items-start flex-col px-3 py-5">
          <li onClick={() => navigate("/")}>Dashboard</li>
          <li onClick={() => navigate("/schedule")}>Schedule Interview</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
