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
  const {
    open,
    onClose,
    projectCategory,
    projectName,
    projectStatus,
    ProjectNameHandler,
    PprojectStatusHandler,
    ProjectCategoryHandler,
    createProjectHandler,
  } = props;

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div className="MODAL_STYLES">
        <h1>Add a product</h1>
        <form className="product__form" onSubmit={createProjectHandler}>
          <div className="inputGroup inputGroup1">
            <label>Project Name</label>
            <input
              className="inputGroup__textfield"
              placeholder="project name"
              onChange={ProjectNameHandler}
              value={projectName}
            />
          </div>
          {/* <div className="inputGroup inputGroup2">
            <input className="inputGroup__textfield" placeholder="Company" />
          </div> */}
          <div className="inputGroup inputGroup3">
            <label>Project Status</label>
            <select
              className="inputGroup__textfield_dropdown"
              value={projectStatus}
              onChange={PprojectStatusHandler}
            >
              <option value="published">published</option>
              <option value="in-work">in-work</option>
            </select>
          </div>
          <div className="inputGroup inputGroup4">
            <label>Project Category</label>
            <select
              className="inputGroup__textfield_dropdown"
              value={projectCategory}
              onChange={ProjectCategoryHandler}
            >
              <option value="external-project">external-project</option>
              <option value="internal-project">internal-project</option>
            </select>
          </div>
          <div class="inputGroup inputGroup5">
            <button
              type="submit"
              onClick={createProjectHandler}
              className="product__create__button"
            >
              Create
            </button>
          </div>
          <div class="inputGroup inputGroup6">
            <button
              onClick={onClose}
              type="button"
              className="close_modal_button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>,
    // exo fitaksi ena neo id me dive sto public folder sto index.html
    document.getElementById("portal")
  );
}

export default Modal;
