import React from 'react';

import { DUMMY_USERS_LIST } from '../../shared/util/DummyUsers';
//filter, teachersList, pagination
import TeacherList from '../components/TeacherList';

const Teachers = () => {
  return <TeacherList teachers={DUMMY_USERS_LIST} />;
};

export default Teachers;
