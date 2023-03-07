import React from "react";

/**
 *
 * @returns teacher profile structure and experience.
 */

const TeacherItem = (props) => {
  const { teacher } = props;
  return <p>hello {teacher.name} Welcome</p>;
};

export default TeacherItem;
