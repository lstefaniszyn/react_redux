import React from "react";
import { CoursesPage } from "./CoursesPage";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

function render(args) {
  const defaultProps = {
    authors: [],
    courses: [],
    loading: true,
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
  return mount(
    <MemoryRouter>
      <CoursesPage {...props} />
    </MemoryRouter>
  );
}

it('Given CoursePage when courses list is empty then CoursePage shows text "No courses available" ', () => {
  const wrapper = render({ courses: [], loading: false });
  expect(wrapper.find("h3").text()).toEqual("No courses available");
});
