import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-named-as-default
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export const CoursesPage = ({
  authors,
  courses,
  loading = true,
  actionLoadCourses,
  actionDeleteCourse,
  actionLoadAuthors,
}) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      actionLoadAuthors().catch((error) => {
        alert(`Loading authors failed ${error}`);
      });
    }

    if (courses.length === 0) {
      actionLoadCourses().catch((error) => {
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
      await actionDeleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      {redirectToAddCoursePage && <Redirect to="/course" />}

      {loading ? (
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

          {courses.length === 0 ? (
            <h3 style={{ fontFamily: "cursive" }}>No courses available</h3>
          ) : (
            <CourseList
              authors={authors}
              courses={courses}
              onDeleteCourse={handleDeleteCourse}
            />
          )}
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

const mapDispatchToProps = {
  actionLoadCourses: courseActions.loadCourses,
  actionLoadAuthors: authorActions.loadAuthors,
  actionDeleteCourse: courseActions.deleteCourse,
  // createCourse: (course) => dispatch(courseActions.createCourse(course)),
  // loadCourses: () => dispatch(courseActions.loadCourses()),
};

CoursesPage.propTypes = {
  // createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actionLoadCourses: PropTypes.func.isRequired,
  actionLoadAuthors: PropTypes.func.isRequired,
  actionDeleteCourse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
