import React from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TeacherDetailsItem from "../components/TeacherDetailsItem";

//teacher data page + resume + contactTeacher

const TeacherDetails = () => {
  const userId = useParams().uid;
  //const [userData, setUserData] = useState({});
  const { error, sendRequest, clearError } = useHttpClient();

  const getTeacherInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS}/${userId}`);
      if (!response.ok) {
        throw new Error("There was an error with the request for TeacherData");
      }
      const data = await response.json();

      return data.user;
    } catch (err) {}
  };

  const { data: userData, isLoading } = useQuery(
    ["teacherDetails", userId],
    () => getTeacherInfo()
  );

  return (
    <PageContainer>
      <Content>
        <ErrorModal error={error} onClear={clearError} />
        <TeacherDetailsItem isLoading={isLoading} teacher={userData} />
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default TeacherDetails;
