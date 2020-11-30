const { validationResult } = require("express-validator");

const HttpError = require("../../error/http-error");

const User = require("../../models/user");
const Project = require("../../models/project");

// na valo asinyc giati kano save kai item sto database
const createProject = async (req, res, next) => {
  const errors = validationResult(req);
  // trekari an exei erorr apo ta items pou checkara sto route pou thelo na kano validate

  if (!errors.isEmpty()) {
    // an den einai empty simeni oti exo errors
    return next(new HttpError("invalid input passed check your data", 422));
  }
  // den thelo na perno to id (diladi to creator apo to frontend ala thelo na to perno apo to authmiddlewre gia afto to vgazo apo to distracutring pou penro apo to req.body)
  // console.log(req.userData.userId);
  const { projectCategory, projectName, projectStatus } = req.body;
  //   apo to na grafo title:tittle kai paei legodas
  const createdProject = new Project({
    projectCategory: projectCategory,
    projectName: projectName,
    projectStatus: projectStatus,
    creator: req.userData.userId,
    // to exo parei to id apo to auth middleware
  });

  // trekaro prin ftiakos to new place an iparxei o user sto database
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Creating project failed, please try again",
      500
    );
    return next(error);
  }

  // an den iparxei petao error
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  // epidi tora thelo na kano pola pragmata meto mongo se ena reuwest gia pardigma thelo na kano save to item pou molis euftaksa kai meta thelo sto User collection na pao sto user kai na valo sto items array to item pou molis eftiaksa xrisimopo to monogose Session gia na ketleoso olo to logic pou thelo mesa sto session afto edo to session vevenote oti tha ekteletsthi mono an ola ta pragamata mesa sto session eiani eptiixi OTAN EXO LOCAL MONGO PREPEI NA KANO COMMENT OUT TA SESSION !!!!!!!!!! TA SESSION TA THELO MONO GIA TO ATLASS

  try {
    console.log("try to save");

    await createdProject.save();
    console.log("worked");
    // prostheto to project pou molis eftiakso sto user schema oste na boro na to vbro apo to user
    user.projects.push(createdProject);
    console.log("worked");
    await user.save();
  } catch (err) {
    console.log("ERROR", err);
    const error = new HttpError(
      "Creating project failed, please try again later",
      500
    );
    return next(error);
    //vazoume next gia na stamatisoume to code execution tou functions mias kai exoume error
  }

  res.status(201).json({ project: createdProject });
};

// epidi perno to user id apo to user meso tou token sto auth middlwre exo acess sto user id !!! Afto to user id den bori na to laaksi kaneis giati to perno mesa apo token kai prin kano update to place thelo na tskero an to crateor id feild pou exo sto database teriazei me to id pou penro apo to auth middleware kai mono tote na to kano update !!

module.exports = createProject;
