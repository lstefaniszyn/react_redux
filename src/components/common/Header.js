import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Header = ({ coursesNumber }) => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <>
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        {"   |  "}
        <NavLink to="/courses" activeStyle={activeStyle}>
          Courses
        </NavLink>
        {"   |  "}
        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
      </nav>
      <label className="number-courses">
        Available courses {coursesNumber}
      </label>
    </>
  );
};

function mapStateToProps(state) {
  return {
    coursesNumber: state.courses.length,
  };
}

Header.propTypes = {
  coursesNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
