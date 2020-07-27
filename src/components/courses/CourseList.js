import React from "react";
import PropTypes from "prop-types";
const { Link } = require("react-router-dom");
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import * as authorActions from "../../redux/actions/authorsActions";

const CourseList = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
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
