import React from "react";

const UrgentJobs = (props) => {
  const { job } = props;
  return (
    <div>
      {job.urgent.length > 5 ? <p>job.urgent.slice(0,6)</p> : <p>job.urgent</p>}
    </div>
  );
};

export default UrgentJobs;
