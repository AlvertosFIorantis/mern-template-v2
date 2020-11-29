import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255,255,255,0.2)",
  zIndex: 1000,
  backdropFilter: "blur(3px)",
};

function Modal(props) {
  const { open, onClose } = props;
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div className="MODAL_STYLES">
        <button onClick={onClose}>Close Modal</button>
        <h1>test</h1>
      </div>
    </>,
    // exo fitaksi ena neo id me dive sto public folder sto index.html
    document.getElementById("portal")
  );
}

export default Modal;
