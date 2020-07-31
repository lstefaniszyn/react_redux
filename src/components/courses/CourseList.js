import React from "react";
import PropTypes from "prop-types";
const { Link } = require("react-router-dom");

const CourseList = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course) => {
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
                  onClick={() => props.onDeleteClick(course)}
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
