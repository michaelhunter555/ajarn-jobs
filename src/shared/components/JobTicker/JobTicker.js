import "./JobTicker.css";

import React, { useEffect, useRef, useState } from "react";

const JobTicker = () => {
  const [jobs, setJobs] = useState([
    {
      id: "3",
      title: "Filipino Teacher",
      location: "Bangkok",
      salary: "50,000THB P/M",
    },
    {
      id: "4",
      title: "English Teacher",
      location: "Nakhon Nayok, Th",
      salary: "50,000THB P/M",
    },
    {
      id: "5",
      title: "Online Chinese Teacher",
      location: "Nontabur, TH",
      salary: "50,000THB P/M",
    },
    {
      id: "4",
      title: "English Teacher",
      location: "Chiang Mai, TH",
      salary: "50,000THB P/M",
    },
  ]);

  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const tickerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentJobIndex((prev) => (prev === jobs.length - 1 ? 0 : prev + 1));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobs.length, isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleJobClick = (job) => {
    console.log(`clicked on job ${job.title}`);
  };

  return (
    <>
      <p
        className="job-ticker__location"
        style={{
          display: "flex",
          alignItems: "left",
          verticalAlign: "top",
          lineHeight: "px",
        }}
      >
        Featured:
      </p>
      <div
        className="job-ticker"
        ref={tickerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul
          className="job-ticker__list"
          style={{
            transform: `translateY(-${currentJobIndex * 2.5}rem)`,
          }}
        >
          {jobs.map((job) => (
            <li
              key={job.id}
              className="job-ticker__item"
              onClick={handleJobClick}
            >
              <div className="job-ticker__location">{job.title}</div>
              <div className="job-ticker__location">
                {job.location} - {job.salary}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default JobTicker;
