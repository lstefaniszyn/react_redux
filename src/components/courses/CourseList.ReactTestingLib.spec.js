import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import CourseList from "./CourseList";
import { courses, authors } from "../../../tools/mockData";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

function renderElement(args) {
  const defaultProps = {
    authors,
    courses,
    onDeleteClick: () => {},
  };

  const props = { ...defaultProps, ...args };

  return render(
    <MemoryRouter>
      <CourseList {...props} />
    </MemoryRouter>
  );
}

it('Given non empty CourseList when I start filter by "Title" that does not exists then number of visible courses will reduce to this one', () => {
  renderElement();
  var element = document.getElementsByName("title")[0];

  fireEvent.change(element, { target: { value: "TestMe" } });
  var tableRows = document.getElementsByTagName("tr");
  console.log(`Title is: ${tableRows[1].cells[1].textContent}`); // prints Securing React Apps with Auth0
  console.log(tableRows.length > 0);
  expect(element.value).toBe("TestMe");
  //   screen.debug();
});

it('Given non empty CourseList when I start filter by "Title" that partially exists then number of visible courses will reduce', () => {});

it('Given non empty CourseList when I start filter by "Title" that does not exists then number of visible courses will be null', () => {});
