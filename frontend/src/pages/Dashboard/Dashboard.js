import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import PlusSign from "../../icons/PlusSign";
import ProjectComponent from "../../components/ProjectComponent/ProjectComponent";
import Modal from "../../components/Modal/Modal";
import { connect } from "react-redux";
import { GetMyProjects } from "../../_actions/actions/Projects/GetMyProjects";

function Dashboard(props) {
  const [isOpen, setIsOpen] = useState(false);

  //starte for the inputs on the modal
  const [projectCategory, setProjectCategory] = useState("internal-project");

  const [projectName, setProjectName] = useState("project Name");

  const [projectStatus, setProjectStatus] = useState("in-work");

  const ProjectNameHandler = (e) => {
    setProjectName(e.target.value);
  };

  const PprojectStatusHandler = (e) => {
    setProjectStatus(e.target.value);
  };

  const ProjectCategoryHandler = (e) => {
    setProjectCategory(e.target.value);
  };

  const onClosingModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const createProjectHandler = (event) => {
    event.preventDefault();
    console.log(projectCategory, projectStatus, projectName);
  };

  useEffect(() => {
    props.GetMyProjects();
  }, []);

  return (
    <div className="wrapper">
      <Modal
        open={isOpen}
        onClose={onClosingModalHandler}
        projectCategory={projectCategory}
        projectName={projectName}
        projectStatus={projectStatus}
        ProjectNameHandler={ProjectNameHandler}
        PprojectStatusHandler={PprojectStatusHandler}
        ProjectCategoryHandler={ProjectCategoryHandler}
        createProjectHandler={createProjectHandler}
      />
      <section className="section">
        <header className="section__header">
          <h2 className="section__title">Projects</h2>
          <div className="section__control">
            <button
              className="section__button section__button--painted focus--box-shadow"
              type="button"
              aria-label="Add New project"
              onClick={onClosingModalHandler}
            >
              <PlusSign />
            </button>
          </div>
        </header>
        <ul className="project">
          <ProjectComponent
            projectCategory="external-project"
            date="05 May, 2020"
            projectName="Product presentation"
            projectStatus="published"
          />
          <ProjectComponent
            projectCategory="internal-project"
            date="1 January 2020"
            projectName="Internal project"
            projectStatus="published"
          />
          <ProjectComponent
            projectCategory="external-project"
            date="1 February 2020"
            projectName="To diko mou to project"
            projectStatus="in-work"
          />
        </ul>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.project.projects,
  };
};

const mapDispatchToProps = {
  GetMyProjects: GetMyProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
