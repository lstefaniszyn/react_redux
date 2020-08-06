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

describe("Course List, filter by Title", () => {
  it('GIVEN non empty CourseList WHEN I start filter by "Title" that does not exists THEN number of visible courses will reduce to only table headers', () => {
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

  it('GIVEN non empty CourseList WHEN I start filter by "Title" that partially exists THEN number of visible courses will reduce', () => {
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

  it('GIVEN non empty CourseList with already filtered list WHEN I start filter by "Title" that does exist in initial THEN number of visible courses will reduce to only new filtered courses', () => {
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
});

describe("Course List, filter by Category", () => {
  it('GIVEN non empty CourseList WHEN I start filter by "Category" that does not exists THEN number of visible courses will reduce to only table headers', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);

    // When
    var elementInputTitle = document.getElementsByName("category")[0];
    fireEvent.change(elementInputTitle, {
      target: { value: "Category does not exist" },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe("Category does not exist");

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'Category does not exist' should be 0"
    ).toBe(0);
    // screen.debug();
  });

  it('GIVEN non empty CourseList WHEN I start filter by "Category" that partially exists THEN number of visible courses will reduce', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);

    // When
    var elementInputTitle = document.getElementsByName("category")[0];
    fireEvent.change(elementInputTitle, {
      target: { value: "JavaScript" },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe("JavaScript");

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'JavaScript' should be 6"
    ).toBe(6);
    // screen.debug();
  });

  it('GIVEN non empty CourseList with already filtered list WHEN I start filter by "Category" that does exist in initial THEN number of visible courses will reduce to only new filtered courses', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    var elementInputTitle = document.getElementsByName("category")[0];
    fireEvent.change(elementInputTitle, {
      target: { value: "Career" },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe("Career");
    expect(
      tableRows.length,
      "Number of visible rows with 'Career' should be 1"
    ).toBe(1);

    // When
    fireEvent.change(elementInputTitle, {
      target: { value: "JavaScript" },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe("JavaScript");

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'JavaScript' should be 6"
    ).toBe(6);
    // screen.debug();
  });
});

describe("Course List, filter by Author", () => {
  it('GIVEN non empty CourseList WHEN I start filter by "Author" that partially exists THEN number of visible courses will reduce', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);

    // When
    var elementInputTitle = document.getElementsByName("authorId")[0];
    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Scott Allen")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Scott Allen")}`);

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'Scott Allen' should be 2"
    ).toBe(2);
    // screen.debug();
  });

  it('GIVEN non empty CourseList with already filtered list WHEN I start filter by "Author" that does exist in initial THEN number of visible courses will reduce to only new filtered courses', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    var elementInputTitle = document.getElementsByName("authorId")[0];

    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Scott Allen")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Scott Allen")}`);
    expect(
      tableRows.length,
      "Number of visible rows with 'Scott Allen' should be 2"
    ).toBe(2);

    // When
    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Cory House")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Cory House")}`);

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'Cory House' should be 8"
    ).toBe(8);
    // screen.debug();
  });

  it('GIVEN non empty CourseList with already filtered list WHEN I start filter by all "Authors" === "Select Author" THEN number of visible courses will as full list', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    var elementInputTitle = document.getElementsByName("authorId")[0];

    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Scott Allen")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Scott Allen")}`);
    expect(
      tableRows.length,
      "Number of visible rows with 'Scott Allen' should be 2"
    ).toBe(2);

    // When
    fireEvent.change(elementInputTitle, {
      target: { value: "" },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe("");

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'Select Author' should be 10"
    ).toBe(10);
    // screen.debug();
  });
});

function getAuthorId(name) {
  return authors.find((author) => author.name === name).id;
}
