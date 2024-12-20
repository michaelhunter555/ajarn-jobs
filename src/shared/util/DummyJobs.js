import Logo from "../../logo.svg";

export const dummy_jobs = [
  {
    id: "1",
    title: "Native ESL Teacher",
    creationDate: "2023-03-10",
    location: "Bangkok",
    salary: "50,000THB p/m",
    requirements: "Bachelor's degree, TEFL certification",
    description: "Teach English to primary and secondary students in Bangkok.",
    datePosted: "2023-02-28",
    hours: "Full-time",
    workPermit: true,
    jobType: {
      basic: false,
      flare: false,
      featured: true,
    },
    creator: {
      company: "Sine Education",
      url: "https://www.SideEducation.com",
      about:
        "For years we have recognized the critical importance of delivering quality education to Thai children. The mission of providing good teaching is essential in ensuring that the younger generation receives the knowledge and skills necessary to succeed in life. It is through good teaching that we can unlock the potential of our children and equip them with the tools needed to tackle challenges and thrive in the modern world. A good teacher can inspire, motivate and ignite a passion for learning that can last a lifetime. By investing in good teaching, we are investing in the future of our children and the prosperity of our society.",
      logoUrl: Logo,
      companySize: "10-50",
      headquarters: "Bangkok, TH",
      established: "2006",
      presence: [
        "Bangkok",
        "chiang mai",
        "nontaburi",
        "sisaket",
        "Burriram",
        "Nakhon Nayok",
      ],
    },
  },
  {
    id: "2",
    title: "Math Teacher for K9 Kids",
    creationDate: "2023-03-02",
    location: "Chiang Mai",
    salary: "80,000THB p/m",
    requirements:
      "Bachelor's degree in Mathematics, teaching experience preferred",
    description: "Teach Mathematics to secondary students in Chiang Mai.",
    datePosted: "2023-02-27",
    hours: "Full-time",
    workPermit: true,
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "BFits",
      url: "www.SideEducation.com",
      logoUrl: Logo,
      companySize: "10-20",
      headquarters: "Chaing Mai, TH",
      established: "2006",
      presence: ["Bangkok", "chiang mai"],
    },
  },
  {
    id: "3",
    title: "Filipino Teacher",
    creationDate: "2023-03-02",
    location: "Bangkok",
    salary: "50,000THB p/m",
    requirements: "Bachelor's degree in Life, teaching experience preferred",
    description: "Teach Philosphy to university students in bangkok",
    datePosted: "2023-02-27",
    hours: "Full-time",
    workPermit: false,
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "St. Johns Intl'",
      url: "http://www.SideEducation.com",
      logoUrl: Logo,
      companySize: "10-20",
      headquarters: "Bangkok, TH",
      established: "2006",
      presence: ["Bangkok", "chiang mai", "nontaburi", "sisaket"],
    },
  },
];
