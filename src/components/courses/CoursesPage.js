import React, { useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

const CoursesPage = (props) => {
  const [course, setCourse] = useState({ title: "" });

  const handleChange = (event) => {
    const course = { ...course, title: event.target.value };
    console.log(`Course: ${course}`);
    setCourse(course);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //this prevent to rerender page when we click submit
    props.createCourse(course); //it saves thru reducer attribute to Redux
    // alert(course.title);
  };

  return (
    //any time you click Enter or Save,  Form will submit. That is better than in /<input/>, because user can also hit Enter
    <form onSubmit={handleSubmit}>
      <h2>Courses</h2>
      <h3>Add Course</h3>
      <input type="text" onChange={handleChange} value={course.title} />
      <input type="submit" value="Save" />
      {props.courses.map((course) => {
        return <div key={course.title}>{course.title}</div>;
      })}
    </form>
  );
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => dispatch(courseActions.createCourse(course)),
  };
}

CoursesPage.propTypes = {
  createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
