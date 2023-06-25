import React from "react";

import UserContributions from "../components/UserContributions";

//list of user submitted data
//need a form for user, if logged in & teacher
//userContribution Model backend
//need a page for the list of user submissions
//need a detail page for when user clicks or Accordian?
//button to add a user submission
//will need a new Users object for backend
//post controller for backend & route
//will need to be a GET route as well to get all contributions (API Cache)

const IncomeDirectory = () => {
  return <UserContributions />;
};

export default IncomeDirectory;
