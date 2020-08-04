import React from "react";
import { CoursesPage } from "./CoursesPage";
import { cleanup, render } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

function renderCoursePage(args) {
  const defaultProps = {
    courses: [],
    authors: [],
    loading: false,
    actionLoadCourses: jest.fn(() => {
      return Promise.resolve(jest.fn());
    }),
    actionDeleteCourse: jest.fn(() => {
      return Promise.resolve(jest.fn());
    }),
    actionLoadAuthors: jest.fn(() => {
      return Promise.resolve(jest.fn());
    }),
  };

  const props = { ...defaultProps, ...args };
  return render(
    <MemoryRouter>
      <CoursesPage {...props} />
    </MemoryRouter>
  );
}

it('Given CoursePage when courses list is empty then CoursePage shows text "No courses available" ', () => {
  const { getByText, debug } = renderCoursePage();
  getByText("No courses available");
});
