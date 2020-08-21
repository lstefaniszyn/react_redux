import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import * as courseSortActions from "../../redux/actions/courseActions";
import initialState, { sortByTypes } from "../../redux/reducers/initialState";
const { Link } = require("react-router-dom");
import { connect } from "react-redux";

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

export const CourseList = ({
  authors,
  courses,
  onDeleteCourse,
  courseSort,
  actionUpdateCourseSort,
  ...props
}) => {
  const [coursesList, setCoursesList] = useState(courses);
  const [sorterStatus, setSorterStatus] = useState(courseSort);

  useEffect(() => {
    sortCourseList();

    return () => {
      //cleanup;
    };
  }, []);

  function getSortNameType(name, type) {
    let sortBy = Object.values(sorterStatus).filter((f) => {
      return f.sortType != sortByTypes.NONE;
    });

    if ((name != undefined) & (type != undefined)) {
      return [name, type];
    }

    if (sortBy.length === 0) {
      return [sorterStatus.title.name, sortByTypes.ASC];
    } else {
      return [sortBy[0].name, sortBy[0].sortType];
    }
  }

  function sortCourseList(name, type) {
    [name, type] = getSortNameType(name, type);
    setCoursesList([...coursesList.sort(dynamicObjectComparator(name, type))]);

    actionUpdateCourseSort({ name: name, type: type });

    setSorterStatus({
      ...initialState.sortStatus,
      [name]: { sortType: type, name: `${name}` },
    });
  }

  function onDeleteClick(course) {
    onDeleteCourse(course);
    var list = coursesList.filter((c) => {
      return course.id != c.id;
    });

    var [name, type] = getSortNameType();
    setCoursesList([...list.sort(dynamicObjectComparator(name, type))]);
  }

  function onClickSort(event) {
    console.log(`Clicked "${event.target.attributes.name.value}"`);
    var elementName = event.target.attributes.name.value;
    if (!sorterStatus.hasOwnProperty(elementName)) {
      throw new Error("Unable to find Element name to sort");
    }

    var sortType;
    if (sorterStatus[elementName].sortType === sortByTypes.NONE) {
      sortType = sortByTypes.ASC;
    } else if (sorterStatus[elementName].sortType === sortByTypes.ASC) {
      sortType = sortByTypes.DESC;
    } else {
      sortType = sortByTypes.ASC;
    }

    sortCourseList(elementName, sortType);
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
                      event.target.value === "" //when user does not select Author
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
            <tr
              key={
                course.id === null
                  ? Math.floor(Math.random() * 1000)
                  : course.id
              }
            >
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
  onDeleteCourse: PropTypes.func.isRequired,
  courseSort: PropTypes.object.isRequired,
  actionUpdateCourseSort: PropTypes.func.isRequired,
  actionLoadCourseSort: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courseSort: state.courseSort,
  };
}

const mapDispatchToProps = {
  actionUpdateCourseSort: courseSortActions.updateCourseSortSuccess,
  actionLoadCourseSort: courseSortActions.loadCourseSortSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
