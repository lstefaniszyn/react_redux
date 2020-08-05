import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
const { Link } = require("react-router-dom");

const CourseList = ({ authors, courses, onDeleteClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>
            <>
              <p>Title</p>
              <div>
                <TextInput
                  name="title"
                  onChange={(event) => {
                    console.log(`Title updated to: ${event.target.value}`);
                  }}
                />
              </div>
            </>
          </th>
          <th>
            <>
              <p>Author</p>
              <div>
                <SelectInput
                  name="authorId"
                  defaultOption="Select Author"
                  options={authors.map((author) => ({
                    value: author.id,
                    text: author.name,
                  }))}
                  onChange={(event) => {
                    console.log(`Author updated to: ${event.target.value}`);
                  }}
                />
              </div>
            </>
          </th>
          <th>
            <>
              <p>Category</p>
              <div>
                <TextInput
                  name="category"
                  onChange={(event) => {
                    console.log(`Category updated to: ${event.target.value}`);
                  }}
                />
              </div>
            </>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => {
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

// function mapStateToProps(state) {
//   return {
//     authors: state.authors,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loadAuthors: bindActionCreators(authorActions, dispatch),
//     },
//   };
// }

export default CourseList;
// export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
