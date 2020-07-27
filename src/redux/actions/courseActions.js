import actionsType from "./actionsTypes";
import * as courseAPI from "../../api/courseApi";


export function loadCoursesSuccess(courses) {
  return { type: actionsType.LOAD_COURSES_SUCCESS, courses: courses };
}

export function updateCourseSuccess(course) {
  return { type: actionsType.UPDATE_COURSE_SUCCESS, course: course };
}

export function createCourseSuccess(course) {
  return { type: actionsType.CREATE_COURSES_SUCCESS, course: course };
}

export function loadCourses() {
  return function (dispatch) {
    return courseAPI
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    return (
      courseAPI
        .saveCourse(course)
        // eslint-disable-next-line no-unused-vars
        .then((savedCourse) => {
          course.id
            ? dispatch(updateCourseSuccess(course))
            : dispatch(createCourseSuccess(course));
        })
        .catch((error) => {
          throw error;
        })
    );
  };
}
