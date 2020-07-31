import React from "react";
import { mount } from "enzyme";
import { ManageCoursePage } from "./MangeCoursePage";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { MemoryRouter } from "react-router-dom";

function render(args) {
  const defaultProps = {
    courses: courses,
    authors: authors,
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    saveCourse: jest.fn(),
    // history: {},
    course: newCourse,
    match: {},
  };
  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <ManageCoursePage {...props} />
    </MemoryRouter>
  );
}

it("", () => {
  const wrapper = render();

  wrapper.find("form").simulate("submit");
  console.log(wrapper.debug());
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
