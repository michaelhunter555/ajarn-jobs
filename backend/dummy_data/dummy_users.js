let SINGLE_DUMMY_USERS = [
  {
    id: "u1",
    name: "John Doe",
    nationality: "American",
    location: "Bangkok",
    credits: 0,
    education: "Bachelor of Education, Chulalongkorn University",
    workExperience: "5 years teaching experience",
    interests: ["Teaching", "Traveling", "Photography"],
    bio: "Hi, my name is John and I am originally from Bakalashaka, Minnesota. Never heard of it? Well, that's because it's a small town in bumbleF*&# minny SOTAAAA YEAH BOII",
    skill: ["student-centered", "PPP", "lesson planning"],
    resume: [
      {
        resumeId: 1,
        company: "Bright Future",
        schoolName: "Bright Future International",
        role: "teach m1 and m2 conversational English",
        location: "Bangkok, Thailand",
        jobTitle: "English Teacher",
        from: 2004,
        to: 2012,
      },
      {
        resumeId: 2,
        company: "GunChunk GooJang",
        schoolName: "Korea University English Pg",
        role: "Teach university students business English",
        location: "Seoul, South korea",
        jobTitle: "English Teacher",
        from: 2002,
        to: 2004,
      },
      {
        resumeId: 3,
        company: "Bright Future",
        schoolName: "Bright Future International",
        role: "teach m1 and m2 conversational English",
        location: "Bangkok, Thailand",
        jobTitle: "English Teacher",
        from: 2000,
        to: 2002,
      },
    ],
    userType: "teacher",
  },
];

let DUMMY_USERS_LIST = [
  {
    id: "u1",
    name: "John Doe",
    image: "John",
    credits: 0,
    location: "Phuket",
    nationality: "American",
    education: "Bachelor of Education, Chulalongkorn University",
    workExperience: 5,
    interests: ["Teaching", "Traveling", "Photography"],
    highestCertification: "BA",
    about:
      "hello, my name is john and I have been teaching for over 5years. I love teaching English and creating fun and engaging lessons.",
    skill: ["student-centered", "PPP", "lesson planning"],
    resume: [
      {
        resumeId: 1,
        company: "Bright Future",
        schoolName: "Bright Future International",
        role: "teach m1 and m2 conversational English",
        location: "Bangkok, Thailand",
        jobTitle: "English Teacher",
        from: 2004,
        to: 2012,
      },
      {
        resumeId: 2,
        company: "GunChunk GooJang",
        schoolName: "Korea University English Pg",
        role: "Teach university students business English",
        location: "Seoul, South korea",
        jobTitle: "English Teacher",
        from: 2002,
        to: 2004,
      },
    ],
    userType: "employer",
  },

  {
    id: "u2",
    name: "Michael Hunter",
    image: "MichaelHunter",
    credits: 0,
    location: "Bangkok",
    nationality: "Jamaican",
    education: "Bachelor of Arts, Temple University",
    workExperience: 9,
    interests: ["Teaching", "Traveling", "Photography"],
    highestCertification: "master's degree",
    about: "hello, my name is Michael and I love teaching and coding!",
    skill: ["student-centered", "PPP", "lesson planning"],
    resume: [
      {
        resumeId: 1,
        company: "Bright Future",
        schoolName: "Bright Future International",
        role: "teach m1 and m2 conversational English",
        location: "Bangkok, Thailand",
        jobTitle: "English Teacher",
        from: 2004,
        to: 2012,
      },
    ],
    userType: "teacher",
  },
  {
    id: "u3",
    name: "Bob McFarland",
    image: "Bob",
    credits: 1,
    location: "Bangkok",
    nationality: "Swiss",
    education: "Bachelor of journalism, Harvard",
    workExperience: 2,
    interests: ["Teaching", "Traveling", "Photography"],
    highestCertification: "master's degree",
    about:
      "hello, my name is Bob and I have been teaching for 2 years. I love teaching English and creating fun and engaging lessons.",
    skill: ["student-centered", "PPP", "lesson planning"],
    resume: [
      {
        resumeId: 1,
        company: "Bright Future",
        schoolName: "Bright Future International",
        role: "teach m1 and m2 conversational English",
        location: "Bangkok, Thailand",
        jobTitle: "English Teacher",
        from: 2004,
        to: 2012,
      },
      {
        resumeId: 2,
        company: "GunChunk GooJang",
        schoolName: "Korea University English Pg",
        role: "Teach university students business English",
        location: "Seoul, South korea",
        jobTitle: "English Teacher",
        from: 2002,
        to: 2004,
      },
    ],
    userType: "teacher",
  },
  {
    id: "u4",
    name: "Janitha Willdubs",
    image: "Janitha",
    credits: 0,
    location: "Chiang Mai",
    nationality: "English",
    education: "Bachelor of Education, Khao Saun University",
    workExperience: 1,
    interests: ["Teaching", "Traveling", "Photography"],
    highestCertification: "Phd",
    about:
      "Looking for a new challenge! I am certified Art Teacher having taugh in England, USA, Brazil and Morroco.",
    skill: ["student-centered", "PPP", "lesson planning"],
    resume: [
      {
        resumeId: 1,
        company: "Bright Future",
        schoolName: "Bright Future International",
        role: "teach m1 and m2 conversational English",
        location: "Bangkok, Thailand",
        jobTitle: "English Teacher",
        from: 2004,
        to: 2012,
      },
      {
        resumeId: 2,
        company: "GunChunk GooJang",
        schoolName: "Korea University English Pg",
        role: "Teach university students business English",
        location: "Seoul, South korea",
        jobTitle: "English Teacher",
        from: 2002,
        to: 2004,
      },
    ],
    userType: "teacher",
  },
];

module.exports = {
  DUMMY_USERS_LIST,
  SINGLE_DUMMY_USERS,
};