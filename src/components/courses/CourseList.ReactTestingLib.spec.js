import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
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

test('GIVEN non empty CourseList WHEN I start filter by "Title" that does not exists THEN number of visible courses will reduce to only table headers', () => {
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
  expect(
    tableRows.length,
    "Number of visible rows with 'Course does not exist' should be 0"
  ).toBe(0);
  // screen.debug();
});

test('GIVEN non empty CourseList WHEN I start filter by "Title" that partially exists THEN number of visible courses will reduce', () => {
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
  expect(
    tableRows.length,
    "Number of visible rows with 'Building' should be 3"
  ).toBe(3);
  // screen.debug();
});

test('GIVEN non empty CourseList with already filtered list WHEN I start filter by "Title" that does exist in initial THEN number of visible courses will reduce to only new filtered courses', () => {
  // Given
  renderElement();
  var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
  expect(tableRows.length).toBeGreaterThan(0);
  var elementInputTitle = document.getElementsByName("title")[0];
  fireEvent.change(elementInputTitle, {
    target: { value: "React" },
  }); //  https://testing-library.com/docs/dom-testing-library/api-events
  expect(elementInputTitle.value).toBe("React");
  expect(
    tableRows.length,
    "Number of visible rows with 'React' should be 5"
  ).toBe(5);

  // When
  fireEvent.change(elementInputTitle, {
    target: { value: "Building" },
  }); //  https://testing-library.com/docs/dom-testing-library/api-events
  expect(elementInputTitle.value).toBe("Building");

  // Then
  expect(
    tableRows.length,
    "Number of visible rows with 'Building' should be 3"
  ).toBe(3);
  // screen.debug();
});
