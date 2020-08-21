import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { CourseList } from "./CourseList";
import { courses, authors } from "../../../tools/mockData";
import { MemoryRouter } from "react-router-dom";
import initialState from "../../redux/reducers/initialState";

afterEach(cleanup);

function renderElement(args) {
  const defaultProps = {
    courseSort: initialState.sortStatus,
    authors: authors,
    courses: courses.map((course) => {
      return {
        ...course,
        authorName: authors.find((a) => a.id === course.authorId).name,
      };
    }),
    onDeleteCourse: () => {},
    actionLoadCourseSort: () => {},
    actionUpdateCourseSort: () => {},
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
    var elementInputTitle = document.getElementsByName("title")[1];
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
    var elementInputTitle = document.getElementsByName("title")[1];
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
    var elementInputTitle = document.getElementsByName("title")[1];
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
    var elementInputTitle = document.getElementsByName("category")[1];
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
    var elementInputTitle = document.getElementsByName("category")[1];
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
    var elementInputTitle = document.getElementsByName("category")[1];
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
    var elementInputTitle = document.getElementsByName("authorId")[1];
    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Scott Allen")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Scott Allen")}`);

    // Then
    expect(
      tableRows.length,
      "Number of visible rows with 'Scott Allen' should be 1"
    ).toBe(1);
    // screen.debug();
  });

  it('GIVEN non empty CourseList with already filtered list WHEN I start filter by "Author" that does exist in initial THEN number of visible courses will reduce to only new filtered courses', () => {
    // Given
    renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    var elementInputTitle = document.getElementsByName("authorId")[1];

    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Scott Allen")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Scott Allen")}`);
    expect(
      tableRows.length,
      "Number of visible rows with 'Scott Allen' should be 1"
    ).toBe(1);

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
    var elementInputTitle = document.getElementsByName("authorId")[1];

    fireEvent.change(elementInputTitle, {
      target: { value: `${getAuthorId("Scott Allen")}` },
    }); //  https://testing-library.com/docs/dom-testing-library/api-events
    expect(elementInputTitle.value).toBe(`${getAuthorId("Scott Allen")}`);
    expect(
      tableRows.length,
      "Number of visible rows with 'Scott Allen' should be 1"
    ).toBe(1);

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

describe("Course List, Sort by Title", () => {
  it('GIVEN non empty CourseList with default sorting by title A-Z  WHEN I click sort DESC by "Title" THEN courses list will be sorted by Title alphabetical Z-A', () => {
    // Given
    const { debug } = renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    expect(tableRows[0].cells[1].textContent).toBe(
      "Architecting Applications for the Real World"
    );
    var elementInputTitle = document.getElementsByTagName("p").title;

    // When
    fireEvent.click(elementInputTitle); //sort Z-A

    // Then
    expect(tableRows[tableRows.length - 1].cells[1].textContent).toBe(
      "Architecting Applications for the Real World"
    );
    expect(elementInputTitle.className).toBe("sort-header-desc");
  });
  it('GIVEN non empty CourseList WHEN I click sort DESC by "Title" THEN courses list will be sorted by Title alphabetical Z-A', () => {});
  it('GIVEN non empty CourseList WHEN I click sort ASC by "Author" THEN courses list will be sorted by Author alphabetical A-Z', () => {
    // Given
    const { debug } = renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);

    expect(tableRows[1].getElementsByTagName("td")[2].textContent).toBe(
      "Scott Allen"
    );
    var element = document.getElementsByTagName("p").authorId;
    expect(element.className).toBe("sort-header-none");

    // When
    fireEvent.click(element); //sort A-Z

    // Then
    expect(tableRows[1].getElementsByTagName("td")[2].textContent).toBe(
      "Cory House"
    );
    expect(element.className).toBe("sort-header-asc");
  });
  it('GIVEN non empty CourseList WHEN I click sort ASC by "Author" THEN courses list will be sorted by Author alphabetical Z-A', () => {
    // Given
    const { debug } = renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    var element = document.getElementsByTagName("p").authorId;
    fireEvent.click(element); //sort A-Z
    expect(tableRows[0].getElementsByTagName("td")[2].textContent).toBe(
      "Cory House"
    );
    expect(element.className).toBe("sort-header-asc");

    // When
    fireEvent.click(element); //sort Z-A

    // Then
    expect(tableRows[0].getElementsByTagName("td")[2].textContent).toBe(
      "Dan Wahlin"
    );
    expect(element.className).toBe("sort-header-desc");
  });
  it('GIVEN non empty CourseList WHEN I click sort ASC by "Category" THEN courses list will be sorted by Category alphabetical A-Z', () => {
    // Given
    const { debug } = renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);

    expect(tableRows[0].getElementsByTagName("td")[3].textContent).toBe(
      "Software Architecture"
    );
    var element = document.getElementsByTagName("p").category;
    expect(element.className).toBe("sort-header-none");

    // When
    fireEvent.click(element); //sort A-Z

    // Then
    expect(tableRows[0].getElementsByTagName("td")[3].textContent).toBe(
      "Career"
    );
    expect(element.className).toBe("sort-header-asc");
  });
  it('GIVEN non empty CourseList WHEN I click sort ASC by "Category" THEN courses list will be sorted by Category alphabetical Z-A', () => {
    // Given
    const { debug } = renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    var element = document.getElementsByTagName("p").category;
    fireEvent.click(element); //sort A-Z
    expect(tableRows[0].getElementsByTagName("td")[3].textContent).toBe(
      "Career"
    );
    expect(element.className).toBe("sort-header-asc");

    // When
    fireEvent.click(element); //sort A-Z

    // Then
    expect(tableRows[0].getElementsByTagName("td")[3].textContent).toBe(
      "Software Practices"
    );
    expect(element.className).toBe("sort-header-desc");
  });

  it('GIVEN non empty CourseList WHEN I click sort ASC by "Category" THEN "Title" and "Author" sorter icon will be set to None', () => {
    // Given
    const { debug } = renderElement();
    var tableRows = document.getElementsByTagName("table")[0].tBodies[0].rows;
    expect(tableRows.length).toBeGreaterThan(0);
    expect(document.getElementsByTagName("p").category.className).toBe(
      "sort-header-none"
    );
    expect(document.getElementsByTagName("p").authorId.className).toBe(
      "sort-header-none"
    );
    expect(document.getElementsByTagName("p").title.className).toBe(
      "sort-header-asc"
    );

    // When
    var element = document.getElementsByTagName("p").category;
    fireEvent.click(element); //sort A-Z

    // Then
    expect(document.getElementsByTagName("p").category.className).toBe(
      "sort-header-asc"
    );
    expect(document.getElementsByTagName("p").authorId.className).toBe(
      "sort-header-none"
    );
    expect(document.getElementsByTagName("p").title.className).toBe(
      "sort-header-none"
    );
  });
});

function getAuthorId(name) {
  return authors.find((author) => author.name === name).id;
}
