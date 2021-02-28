import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import PlusSign from "../../icons/PlusSign";
import ProjectComponent from "../../components/ProjectComponent/ProjectComponent";
import Modal from "../../components/Modal/Modal";
import { connect } from "react-redux";
import { GetMyProjects } from "../../_actions/actions/Projects/GetMyProjects";
import { createProject } from "../../_actions/actions/Projects/createProject";
import { deleteProject } from "../../_actions/actions/Projects/deleteProject";

function Dashboard(props) {
  const [isOpen, setIsOpen] = useState(false);

  //starte for the inputs on the modal
  const [projectCategory, setProjectCategory] = useState("internal-project");

  const [projectName, setProjectName] = useState("");

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
    // Npomizo epidi sto action createProkect sot reucer kano append to neo project pou kano create pou to perno piso apo to api ara ginete update to prokects props pou exo sto mapsStaetToProps nomizo aftmata otan alazi to props ginete re-render to compponet i apla epidi to prosp tora exei ena akoma array den ginete re-render to componet gia na kalaesi to myPRojects actions pou exo sto use effect apla ginete display to extra prokect pou iparxei tora sto prosp.projects pou kano map kai kano display ta data
    props.createProject(
      JSON.stringify({
        projectCategory: projectCategory,
        projectName: projectName,
        projectStatus: projectStatus,
      })
    );
    // klino to modal isos prepei na kano kati pio sofisticated na valo ena settimout na vazo ena loader gia na prolava na paro ta data apo to api prin  kliso to componetne den kseor an to create post epieidi exie async await perimein na paro ta data apo to server prin ektelesi to apo kano function pou eina ito onClosingmodalHalder kai epid
    onClosingModalHandler();
  };

  useEffect(() => {
    props.GetMyProjects();
  }, []);

  const deleteProjectHandler = (projectId) => {
    console.log("Project id that i want to delete:...", projectId);
    props.deleteProject(projectId);
  };

  return (
    <div className="wrapper" data-test="Dashboard">
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
          {/* afto to thelo mono an dne doulevei to backend kai thelo na do pos fenode */}
          {/* <ProjectComponent
            projectCategory="external-project"
            date="1 February 2020"
            projectName="To diko mou to project"
            projectStatus="in-work"
          /> */}
          {/* ta projects apo edo kai pano boro na ta diagrapso  */}
          {props.projects.map((project) => {
            return (
              <ProjectComponent
                projectCategory={project.projectCategory}
                date="1 February 2020"
                projectName={project.projectName}
                projectStatus={project.projectStatus}
                // afta ta 2 props ta thelo gia na kano delete to project
                project_id={project._id}
                deleteProjectHandler={deleteProjectHandler}
                key={project._id}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
  };
};

const mapDispatchToProps = {
  GetMyProjects: GetMyProjects,
  createProject: createProject,
  deleteProject: deleteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
