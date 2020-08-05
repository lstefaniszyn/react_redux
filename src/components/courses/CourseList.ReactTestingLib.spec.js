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

test('Given non empty CourseList when I start filter by "Title" that does not exists then number of visible courses will reduce to only table headers', () => {
  // Given
  renderElement();
  var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
  expect(tableRows.length).toBeGreaterThan(0);

  // When
  var elementInputTitle = document.getElementsByName("title")[0];
  fireEvent.change(elementInputTitle, {
    target: { value: "Course does not exist" },
  }); //  https://testing-library.com/docs/dom-testing-library/api-events
  expect(elementInputTitle.value).toBe("Course does not exist");

  // Then
  //document.getElementsByTagName("table")[0].tBodies[0].rows[0].textContent
  console.log(`Title is: ${tableRows[1].cells[1].textContent}`); // prints Securing React Apps with Auth0
  expect(tableRows.length, "Number of visible rows should be 0").toBe(0);
  screen.debug();
});

test('Given non empty CourseList when I start filter by "Title" that partially exists then number of visible courses will reduce', () => {
  // Given
  renderElement();
  var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
  expect(tableRows.length).toBeGreaterThan(0);

  // When
  var elementInputTitle = document.getElementsByName("title")[0];
  fireEvent.change(elementInputTitle, {
    target: { value: "Building" },
  }); //  https://testing-library.com/docs/dom-testing-library/api-events
  expect(elementInputTitle.value).toBe("Building");

  // Then
  //document.getElementsByTagName("table")[0].tBodies[0].rows[0].textContent
  console.log(`Title is: ${tableRows[1].cells[1].textContent}`); // prints Securing React Apps with Auth0
  expect(tableRows.length, "Number of visible rows should be 3").toBe(3);
  screen.debug();
});
