const HttpError = require("../../error/http-error");

const DragableDiv = require("../../models/dragableDiv");

const getDragableDivs = async (req, res, next) => {
  // to perno to user id apo to auth middleware mias kai to sigkerkimeno controler einai se protected route
  const userId = req.userData.userId;
  let dragabledivs;
  try {
    // edo dne xrisimopio to findby id giati den pernao id ala thelo na vro to item vasi alo field opote firximopio to find kai pernao san argument to id tou tou creator na teriazei me to creator feild pou exo sto database
    dragabledivs = await DragableDiv.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching dragabledivs failed, please try again later",
      500
    );
    return next(error);
  }

  if (!dragabledivs || dragabledivs.length === 0) {
    //   kai gia na min etktesethi to epomeno repsonse kano retunr gia na vgo apo to midldlware
    const error = new HttpError("couldnt find any dragabledivs f", 404);
    // afto eiani gian ato exo san status code otan stelno to midldwre pou tsekaro an exo error,code i vazo apla 500
    return next(error);
  }

  res.json({
    // kano map to array gia na kano convert ola ta objects mesaa sto array se javacript objects
    dragabledivs: dragabledivs.map((dragabledivs) =>
      // dragabledivs.toObject({ getters: true })
      {
        const finalDiv = {
          _id: dragabledivs._id,
          XCoordinates: dragabledivs.XCoordinates,
          YCoordinates: dragabledivs.XCoordinates,
        };
        return finalDiv;
      }
    ),
  });
};

module.exports = getDragableDivs;
