import React from "react";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import { styled } from "@mui/material/styles";

import Backdrop from "./Backdrop";

const StyledTransition = styled("div")`
  .modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }

  .modal-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 200ms;
  }

  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-exit-active {
    transform: translateY(-10rem);
    opacity: 0;
    transition: all 200ms;
  }
`;

const ModalStyles = styled("div")(({ theme }) => ({
  zIndex: 100,
  position: "fixed",
  top: "22vh",
  left: "10%",
  width: "80%",
  background: "white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  borderRadius: "8px",

  [theme.breakpoints.up("md")]: {
    left: "calc(50% - 20rem)",
    width: "40rem",
  },
}));

const ModalHeaderStyles = styled("header")(({ theme }) => ({
  width: "100%",
  padding: "1rem 0.5rem",
  background: "#2a006e",
  color: "white",

  h2: {
    margin: "0.5rem",
  },
}));

const ModalContentStyles = styled("div")(({ theme }) => ({
  padding: "1rem 0.5rem",
}));

const ModalFooterStyles = styled("footer")(({ theme }) => ({
  padding: "1rem 0.5rem",
}));

const ModalOverlay = (props) => {
  const content = (
    <ModalStyles className={`modal ${props.className}`} style={props.style}>
      <ModalHeaderStyles className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </ModalHeaderStyles>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <ModalContentStyles className={`modal__content ${props.contentClass}`}>
          {props.children}
        </ModalContentStyles>
        <ModalFooterStyles className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </ModalFooterStyles>
      </form>
    </ModalStyles>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <StyledTransition>
        <CSSTransition
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames={{
            enter: "modal-enter",
            enterActive: "modal-enter-active",
            exit: "modal-exit",
            exitActive: "modal-exit-active",
          }}
        >
          <ModalOverlay {...props} />
        </CSSTransition>
      </StyledTransition>
    </React.Fragment>
  );
};

export default Modal;
