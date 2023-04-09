import './JobItem.css';

import React, {
  useContext,
  useState,
} from 'react';

import { FaMoneyBillWave } from 'react-icons/fa';
import {
  MdAvTimer,
  MdLocationPin,
} from 'react-icons/md';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';

const JobItem = (props) => {
  //create auth context
  const authCtx = useContext(AuthContext);
  //set state for confirm modal
  const [modalConfirm, setModalConfirm] = useState(false);

  //create a ShowDeleteWarningHandler && cancelDeleteWarningHandler && confirmDeleteWarningHandler
  const ShowDeleteWarningHandler = () => {
    setModalConfirm(true);
  };

  const cancelDeleteWarningHandler = () => {
    setModalConfirm(false);
  };

  const confirmDeleteHandler = () => {
    setModalConfirm(false);
  };

  return (
    <>
      <Modal
        show={modalConfirm}
        onCancel={cancelDeleteWarningHandler}
        header="are you sure you want to delete this item?"
        footerClass="job-item__modal-action"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      ></Modal>
      {/*fix li element on here or jobLists.js () */}
      <Card className={`job-item ${props.jobType ? "featured" : ""}`}>
        <div className="job-item__header">
          <div className="job-item__company-logo">
            <img src={props.schoolLogo} alt={props.creator} />
          </div>
          <div className="job-item__info">
            <h2>{props.title}</h2>

            <h3>{props.salary}</h3>
            <p>
              {props.company} - {props.datePosted}
            </p>
          </div>
        </div>
        <div className="job-item__footer">
          <div className="job-items-icons__info">
            <div className="job-item-icon__location">
              <MdLocationPin size={25} />
              {props.location}
            </div>
            <div className="job-item-icon__hours">
              <MdAvTimer size={25} />
              {props.hours}
            </div>
            <div className="job-item-icon__salary">
              <FaMoneyBillWave size={25} />
              At Least {props.salary.split(" - ")[0]}{" "}
              {/*"30,000 - 50,000 THB/month" */}
            </div>
          </div>
          {!authCtx.isLoggedIn && <Button>Login to apply!</Button>}
          {authCtx.isLoggedIn && <Button to={`/jobs/${props.id}`}>View</Button>}
          {authCtx.isLoggedIn && (
            <Button
              className="job-item__delete"
              onClick={ShowDeleteWarningHandler}
            >
              Delete
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default JobItem;

/**

id: 1,
    jobTitle: "English Teacher",
    location: "Bangkok",
    salary: "30,000 - 50,000 THB/month",
    requirements: "Bachelor's degree, TEFL certification",
    description: "Teach English to primary and secondary students in Bangkok.",
    datePosted: "2023-02-28",
    creator: {
      company: "Sine Education",
      logoUrl: "#",
      companySize: "10-50",
    }
       */
