const HttpError = require("../../error/http-error");

const Project = require("../../models/project");

const deleteProject = async (req, res, next) => {
  // to perno apo to req.params giati to id einai sto url to projectId pou leo to exo giati sto route exo /:projectid
  const projectId = req.params.projectid;

  let project;
  try {
    // vlepo an to Object pou exo sto Prokect collection iparxi kai an iparxei girnao pisto to project mazi meto feaitedl createor
    project = await Project.findById(projectId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!project) {
    const error = new HttpError("Could not find project for this id.", 404);
    return next(error);
  }

  // thelo mono osuer pou eftiakse to project na borei na to kanei delte kai xrisimopio akrivos tin idia logiki pou eixa kai apo pano sto update project method
  if (project.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this project.",
      401
    );
    return next(error);
  }

  try {
    await project.remove();
    project.creator.projects.pull(project);
    await project.creator.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete project.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted project." });
};

module.exports = deleteProject;
