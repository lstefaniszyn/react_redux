import actionsType from "./actionsTypes";
import * as courseAPI from '../../api/courseApi';


export function createCourse(course) {
  return { type: actionsType.CREATE_COURSE, course: course };
}

export function loadCoursesSuccess(courses){
  return { type: actionsType.LOAD_COURSES_SUCCESS, courses: courses}
}

export function loadCourses(){
  return function(dispatch){
    return courseAPI.getCourses().then( courses => {
      dispatch( loadCoursesSuccess(courses) );
    }).catch(error => {
      throw error;
    })
  }
}