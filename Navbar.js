import React from "react";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ReactJs Chat Application</div>{" "}
      <div className="navbar-actions">
        <button onClick={() => alert("Profile Login")}>
          {" "}
          <FaUserCircle size={24} />
        </button>
        {""}
      </div>
    </nav>
  );
};

export default Navbar;
