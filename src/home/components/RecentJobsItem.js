//JobsItems.js

import './RecentJobsItem.css';

import React from 'react';

const RecentJobsItem = (props) => {
  return (
    <li className="home-page__recent-jobs">
      <div className="home-page__recent-jobs-container">
        <img src={props.logo} alt={props.title} />
        <div className="home-page__recent-jobs-details">
          <p>{props.datePosted}</p>
          <p>{props.salary}</p>
          <p>{props.location}</p>
        </div>
      </div>
    </li>
  );
};

export default RecentJobsItem;
