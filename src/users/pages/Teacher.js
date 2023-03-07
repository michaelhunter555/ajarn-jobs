import React from "react";

/**
 *
 * @returns homepage for Teachers
 */

const user_dummy_data = [
  {
    name: "John Doe",
    yearsOfExperience: 5,
    nationality: "American",
    education: "Bachelor's Degree in Education",
    additionalSkills: "Proficient in Microsoft Office",
    qualifications: [
      "TEFL Certification",
      "TESOL Certification",
      "CELTA Certification",
    ],
    workExperience: [
      {
        position: "English Teacher",
        employer: "ABC Language School",
        duration: "2018-2020",
      },
      {
        position: "Online English Tutor",
        employer: "ABC Tutoring",
        duration: "2020-present",
      },
    ],
    recommendationsUponRequest: true,
    otherInformation: "Fluent in Spanish and Japanese",
  },
];

const Teacher = () => {
  return <div>Teacher</div>;
};

export default Teacher;
