import React, { useState, useEffect } from "react";
import PropTypes, { elementType } from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
const { Link } = require("react-router-dom");

function dynamicObjectComparator(property, sortType = sortByTypes.ASC) {
  return function (a, b) {
    if (a[property] > b[property]) {
      return -1 * sortType.sortOrder;
    } else if (a[property] < b[property]) {
      return 1 * sortType.sortOrder;
    } else {
      return 0;
    }
  };
}

const sortByTypes = {
  DESC: { text: "descending", sortOrder: 1, class: "sort-header-desc" },
  ASC: { text: "ascending", sortOrder: -1, class: "sort-header-asc" },
  NONE: { text: "none", sortOrder: 0, class: "sort-header-none" },
};

const CourseList = ({ authors, courses, onDeleteClick }) => {
  const defaultSorterStatus = {
    title: { sortType: sortByTypes.NONE, name: "title" },
    authorId: { sortType: sortByTypes.NONE, name: "authorId" },
    category: { sortType: sortByTypes.NONE, name: "category" },
  };
  const [coursesList, setCoursesList] = useState(courses);
  const [sorterStatus, setSorterStatus] = useState(defaultSorterStatus);

  useEffect(() => {
    setCoursesList([
      ...coursesList.sort(dynamicObjectComparator("title", sortByTypes.ASC)),
    ]);

    setSorterStatus({
      ...sorterStatus,
      ["title"]: { sortType: sortByTypes.ASC, name: "title" },
    });

    return () => {
      //cleanup;
    };
  }, []);

  function onClickSort(event) {
    console.log(`Clicked "${event.target.attributes.name.value}"`);
    var elementName = event.target.attributes.name.value;
    if (!sorterStatus.hasOwnProperty(elementName)) {
      throw new Error("Unable to find Element name to sort");
    }

    let sortType;
    if (sorterStatus[elementName].sortType === sortByTypes.NONE) {
      // sorterStatus[elementName].sortType = sortByTypes.ASC;
      sortType = sortByTypes.ASC;
    } else if (sorterStatus[elementName].sortType === sortByTypes.ASC) {
      sortType = sortByTypes.DESC;
    } else {
      sortType = sortByTypes.ASC;
    }

    // debugger;
    setSorterStatus({
      ...defaultSorterStatus,
      [elementName]: { sortType: sortType, name: `${elementName}` },
    });

    setCoursesList([
      ...coursesList.sort(dynamicObjectComparator(elementName, sortType)),
    ]);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>
            <>
              <p
                name="title"
                className={sorterStatus.title.sortType.class} //"sort-header-none"
                onClick={(event) => {
                  onClickSort(event);
                }}
              >
                Title
              </p>
              <div>
                <TextInput
                  name="title"
                  onChange={(event) => {
                    setCoursesList(
                      courses.filter((course) => {
                        return `${course.title.toLowerCase()}`.includes(
                          event.target.value.toLowerCase()
                        );
                      })
                    );
                  }}
                />
              </div>
            </>
          </th>
          <th>
            <>
              <p
                name="authorId"
                className={sorterStatus.authorId.sortType.class} //"sort-header-none"
                onClick={(event) => {
                  onClickSort(event);
                }}
              >
                Author
              </p>
              <div>
                <SelectInput
                  name="authorId"
                  defaultOption="Select Author"
                  options={authors.map((author) => ({
                    value: author.id,
                    text: author.name,
                  }))}
                  onChange={(event) => {
                    setCoursesList(
                      event.target.value === "" //when user did not select Author
                        ? courses
                        : courses.filter((course) => {
                            return (
                              course.authorId ===
                              parseInt(event.target.value, 10)
                            );
                          })
                    );
                  }}
                />
              </div>
            </>
          </th>
          <th>
            <>
              <p
                name="category"
                className={sorterStatus.category.sortType.class} //"sort-header-none"
                onClick={(event) => {
                  onClickSort(event);
                }}
              >
                Category
              </p>
              <div>
                <TextInput
                  name="category"
                  onChange={(event) => {
                    setCoursesList(
                      courses.filter((course) => {
                        return `${course.category.toLowerCase()}`.includes(
                          event.target.value.toLowerCase()
                        );
                      })
                    );
                  }}
                />
              </div>
            </>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {coursesList.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(course)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
