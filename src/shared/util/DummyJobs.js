import Logo from '../../logo.svg';

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
    jobType: {
      basic: false,
      flare: false,
      featured: true,
    },
    creator: {
      company: "Sine Education",
      logoUrl: Logo,
      companySize: "10-50",
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
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "BFits",
      logoUrl: Logo,
      companySize: "10-20",
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
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "St. Johns Intl'",
      logoUrl: Logo,
      companySize: "10-20",
    },
  },
];
