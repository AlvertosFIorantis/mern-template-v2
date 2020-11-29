import React from "react";
import "./Dashboard.css";
import Settings from "../../icons/Settings";
import PlusSign from "../../icons/PlusSign";
import ProjectComponent from "../../components/ProjectComponent/ProjectComponent";

function Dashboard() {
  return (
    <div className="wrapper">
      <section className="section">
        <header className="section__header">
          <h2 className="section__title">Projects</h2>
          <div className="section__control">
            <button
              className="section__button focus--box-shadow"
              type="button"
              aria-label="Filter projects"
            >
              <Settings />
            </button>
            <button
              className="section__button section__button--painted focus--box-shadow"
              type="button"
              aria-label="Add New project"
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

export default Dashboard;
