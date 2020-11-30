const HttpError = require("../../error/http-error");

const Project = require("../../models/project");

const getProjects = async (req, res, next) => {
  // to perno to user id apo to auth middleware mias kai to sigkerkimeno controler einai se protected route
  const userId = req.userData.userId;
  let projects;
  try {
    // edo dne xrisimopio to findby id giati den pernao id ala thelo na vro to item vasi alo field opote firximopio to find kai pernao san argument to id tou tou creator na teriazei me to creator feild pou exo sto database
    projects = await Project.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching projects failed, please try again later",
      500
    );
    return next(error);
  }

  if (!projects || projects.length === 0) {
    //   kai gia na min etktesethi to epomeno repsonse kano retunr gia na vgo apo to midldlware
    const error = new HttpError("couldnt find any projects f", 404);
    // afto eiani gian ato exo san status code otan stelno to midldwre pou tsekaro an exo error,code i vazo apla 500
    return next(error);
  }

  res.json({
    // kano map to array gia na kano convert ola ta objects mesaa sto array se javacript objects
    projects: projects.map((projects) => projects.toObject({ getters: true })),
  });
};

module.exports = getProjects;
