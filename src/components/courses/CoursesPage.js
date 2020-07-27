import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

const CoursesPage = (props) => {
  const { authors, courses, actions } = props;

  useEffect(() => {
    if (authors.length === 0) {
      actions.loadAuthors.loadAuthors().catch((error) => {
        alert(`Loading authors failed ${error}`);
      });
    }

    if (courses.length === 0) {
      actions.loadCourses.loadCourses().catch((error) => {
        alert(`Loading courses failed ${error}`);
      });
    }

    // OR
    // props.loadCourses().catch((error) => {
    //   alert(`Loading courses failed ${error}`);
    // });

    return () => {};
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <CourseList courses={courses} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions, dispatch),
      loadAuthors: bindActionCreators(authorActions, dispatch),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
