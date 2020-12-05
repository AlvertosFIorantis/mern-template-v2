import React from "react";
import ThreeDots from "../../icons/ThreeDots";
import ProjectIcon from "../../icons/ProjectIcon";
import BookCover from "../../icons/BookCover";

// NOTE: na thimitho na alakso to a tag se LINK me to react router
function ProjectComponent(props) {
  return (
    <li class="project__item">
      <a href="#" className="project__link focus--box-shadow">
        <div className="project__wrapper">
          {props.projectCategory == "external-project" ? (
            <div className="project__element project__icon">
              <div
                className="icon icon--viking"
                aria-label="Icon for the project 'Book cover design'"
              >
                <ProjectIcon />
              </div>
            </div>
          ) : (
            <div className="project__element project__icon">
              <div
                className="icon icon--rajah"
                aria-label="Icon for the project 'Book cover design'"
              >
                <BookCover />
              </div>
            </div>
          )}
          <div className="project__element project__inform">
            <span className="project__inform-name">{props.projectName}</span>
          </div>
          <div className="project__element project__photo">
            <ul className="photo">
              <li className="photo__item">
                {/* <img src="" alt="Jessica's photo" /> */}
              </li>
            </ul>
          </div>
          <div className="project__element project__date">
            <time className="date">{props.date}</time>
          </div>
          {props.projectStatus == "in-work" ? (
            <div className="project__element project__status">
              <span className="status status--in-work">
                {props.projectStatus}
              </span>
            </div>
          ) : (
            <div class="project__element project__status">
              <span class="status status--published">
                {props.projectStatus}
              </span>
            </div>
          )}
          <div className="project__element project__setting">
            <button
              className="setting setting--rotate focus--box-shadow"
              type="button"
              onClick={() => props.deleteProjectHandler(props.project_id)}
            >
              <ThreeDots
                view_Box="0 0 515.555 515.555"
                enable_background={"new 0 0 515.555 515.555"}
                svg_height={"512"}
                svg_width={"512"}
              />
            </button>
          </div>
        </div>
      </a>
    </li>
  );
}

export default ProjectComponent;
