const HttpError = require("../../error/http-error");

const Project = require("../../models/project");
const mongoose = require("mongoose");
// kano import ta function apo to redis
const { get, set } = require("../../redis_config");
const project = require("../../models/project");
const getProjectGroupByStatus = async (req, res, next) => {
  // to perno to user id apo to auth middleware mias kai to sigkerkimeno controler einai se protected route
  const userId = req.userData.userId;

  //REDISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // edo eiani to redsi part gia na pao to object an ipaxei
  const key_reids = userId.concat("groupby");
  // dimiorugo uniguq key giati boro na kano stroe pala pragmata sto redis gia ton idio user
  const data = await get(key_reids);
  // prepei an kano JSON.parse() ta data prin ta stilo
  // an thelo na do oti to reuqeest doulevei na min kano to step pou kano parse ta data oste na do an doulevei na THIMITHO na valo delete to sigkerkimeno pragma otan ftiaxno i diagrafo i kano update kapio apo ta posts
  if (data) {
    // den einai sigouros gia to retunr to vazo apla gia na stmatiso to req
    return res.json({
      projects: JSON.parse(data),
    });
  }
  // an exo ta data tote kano send ta data pou exo sto u
  //REDISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  //aggrgation function that i want to execute in order to get the group by project status and the sum i want to do that only for the projects that belong in sigin user

  const aggregatorOpts = [
    // prepein a kano to userid apo javascript sting mongoost object id gia na doulepsi optoe stin arxi vrisko ola ta projects pou exou exoun to creator id idio me to user pou exei stilei to reqeust san where stament kai meta kano ena group by
    {
      $match: { creator: mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: "$projectStatus",
        count: { $sum: 1 },
      },
    },
  ];
  let projects;
  try {
    // edo dne xrisimopio to findby id giati den pernao id ala thelo na vro to item vasi alo field opote firximopio to find kai pernao san argument to id tou tou creator na teriazei me to creator feild pou exo sto database
    projects = await Project.aggregate(aggregatorOpts).exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching projects failed, please try again later",
      500
    );
    return next(error);
  }
  console.log(projects);

  if (!projects || projects.length === 0) {
    //   kai gia na min etktesethi to epomeno repsonse kano retunr gia na vgo apo to midldlware
    const error = new HttpError("couldnt find any projects f", 404);
    // afto eiani gian ato exo san status code otan stelno to midldwre pou tsekaro an exo error,code i vazo apla 500
    return next(error);
  }

  // Redisxxxxxxxxxxxxxxxxxx
  // kano stor teo response apo to mongo sto redis
  // prepein a kano string to array of object an thelo na to kano save sto redis
  await set(key_reids, JSON.stringify(projects));
  // afto bori na xriasti na to valo kai pio kato apo to res.json gia na do an ginete save sto redis otan exo stili to request borei etsi naeiani pio girogor
  // Redisxxxxxxxxxxxxxxxxxx

  res.json({
    projects: projects,
  });
};

module.exports = getProjectGroupByStatus;
