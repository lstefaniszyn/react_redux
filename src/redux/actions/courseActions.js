import actionsType from "./actionsTypes";

export function createCourse(course) {
  return { type: actionsType.CREATE_COURSE, course: course };
}
