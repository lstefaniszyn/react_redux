import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const CoursesPage = (props) => {
  const { authors, courses, actions } = props;
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert(`Loading authors failed ${error}`);
      });
    }

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert(`Loading courses failed ${error}`);
      });
    }

    // OR
    // props.loadCourses().catch((error) => {
    //   alert(`Loading courses failed ${error}`);
    // });

    return () => {};
  }, []);

  const handleDeleteCourse = async (course) => {
    toast.success("Course deleted."); //we will optimistic by inform use that "Course" has been already deleted
    try {
      await actions.deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  return (
    <div>
      {redirectToAddCoursePage && <Redirect to="/course" />}

      <h2>Courses</h2>

      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>

          <CourseList courses={courses} onDeleteClick={handleDeleteCourse} />
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallStatus > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    // loadCourses: () => dispatch(courseActions.loadCourses()),
  };
}

CoursesPage.propTypes = {
  // createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
