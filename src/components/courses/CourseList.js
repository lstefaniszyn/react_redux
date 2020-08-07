import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  DESC: { text: "descending", sortOrder: 1 },
  ASC: { text: "ascending", sortOrder: -1 },
};

const CourseList = ({ authors, courses, onDeleteClick }) => {
  const [coursesList, setCoursesList] = useState(courses);

  useEffect(() => {
    setCoursesList([
      ...courses.sort(dynamicObjectComparator("title", sortByTypes.ASC)),
    ]);
    return () => {
      //cleanup;
    };
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>
            <>
              <p className="sort-header" onClick={ ()=> {console.log("sortME")}  }>Title</p>
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
              <p className="sort-header">Author</p>
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
              <p className="sort-header">Category</p>
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
