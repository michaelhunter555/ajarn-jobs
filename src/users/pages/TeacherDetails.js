//import { DUMMY_USERS_LIST } from "../../shared/util/DummyUsers";
//teacher data page + resume + contactTeacher

import React, { useState } from 'react';

const TeacherDetails = (props) => {
  const [teacher, setTeacher] = useState(null);

  const teacherDetailsHandler = (teacherData) => {
    setTeacher(teacherData);
    props.RenderTeacher(teacherData);
  };
  return <div>{teacher}</div>;
};

export default TeacherDetails;
