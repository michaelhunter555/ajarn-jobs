import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TeacherDetailsItem from "../components/TeacherDetailsItem";

//teacher data page + resume + contactTeacher

const TeacherDetails = () => {
  const userId = useParams().uid;
  const [userData, setUserData] = useState({});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    try {
      const getUserData = async () => {
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/${userId}`
        );
        setUserData(response.user);
      };
      getUserData();
    } catch (err) {}
  }, [userId, sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <TeacherDetailsItem teacher={userData} />;
    </>
  );
};

export default TeacherDetails;
