import actionsType from "./actionsTypes";
import * as courseAPI from "../../api/courseApi";
import { beginApiCall, errorApiCall } from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: actionsType.LOAD_COURSES_SUCCESS, courses: courses };
}

export function updateCourseSuccess(course) {
  return { type: actionsType.UPDATE_COURSE_SUCCESS, course: course };
}

export function createCourseSuccess(course) {
  return { type: actionsType.CREATE_COURSES_SUCCESS, course: course };
}

export function deleteCourseOptimistic(course) {
  return { type: actionsType.DELETE_COURSE_OPTIMISTIC, course: course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseAPI
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(errorApiCall(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    //doing optimistic delete, so no dispatch begin/end api call actions, or apiCallError action since we're not showing the loading status for this
    dispatch(deleteCourseOptimistic(course));
    return courseAPI.deleteCourse(course.id);
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
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
          dispatch(errorApiCall(error));
          throw error;
        })
    );
  };
}
