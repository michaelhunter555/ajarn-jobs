import React from 'react';

import { useParams } from 'react-router-dom';

import { DUMMY_USERS_LIST } from '../../shared/util/DummyUsers';
import TeacherDetailsItem from '../components/TeacherDetailsItem';

//teacher data page + resume + contactTeacher

const TeacherDetails = () => {
  const userId = useParams().uid;
  const userData = DUMMY_USERS_LIST.find((user) => user.id === userId);

  return <TeacherDetailsItem teacher={userData} />;
};

export default TeacherDetails;
