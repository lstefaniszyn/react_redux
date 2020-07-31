import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";
import { italics } from "../../../tools/fileMock";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    error: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  //   console.log(wrapper.debug());


  //for 'find()'   and many more Enzyme API call look here ->   https://enzymejs.github.io/enzyme/docs/api/shallow.html
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save buttons as "Save" when saving', () => {
  const wrapper = renderCourseForm({ saving: true });
  //   console.log(wrapper.debug());
  expect(wrapper.find("button").text()).toBe("Saving...");
});


