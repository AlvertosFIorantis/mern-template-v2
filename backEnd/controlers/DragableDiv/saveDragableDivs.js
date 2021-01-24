const HttpError = require("../../error/http-error");

const User = require("../../models/user");
const DragableDiv = require("../../models/dragableDiv");

//TELOS TA IMPORTS XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

const saveDragableDivs = async (req, res, next) => {
  const { updated_array } = req.body;
  const { userId } = req.userData;
  // to userData.userId erxete apo to authentication middleware
  // console.log("updated_array 1", updated_array);
  // console.log("Usera data", userId);

  let updatedDivs_array = [];

  for (let i = 0; i < updated_array.length; i++) {
    // console.log(updated_array[i]);
    let div;
    try {
      div = await DragableDiv.findById(updated_array[i]._id);
      // console.log(div);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update div.",
        500
      );
      return next(error);
    }
    // thelo na tskero an to crateor id feild pou exo sto database teriazei me to id pou penro apo to auth middleware kai mono tote na to kano update !!
    if (div.creator.toString() !== userId) {
      const error = new HttpError(
        "You are not allowed to edit this place.",
        401
      );
      return next(error);
    }

    //   Tora pou exo tsekaei oti o user pou kanei save ta divs einai kai aftos pou ta eftiakse arxika kano update ta 2 fields pou thelo
    div.XCoordinates = updated_array[i].XCoordinates;
    div.YCoordinates = updated_array[i].YCoordinates;
    // tora pou vrika to item pou thelo to ekana update to ksana gkano save sto database
    try {
      await div.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update div.",
        500
      );
      return next(error);
    }

    // tora pou teliosa me to update htelo na kano push sto array to updated div gia na to giriso meta sto database
    // console.log({
    //   _id: div._id,
    //   XCoordinates: div.XCoordinates,
    //   YCoordinates: div.YCoordinates,
    // });

    // add the updated div with i change to an object in order to include only specifc fields to the array with the updated_divs
    updatedDivs_array.push({
      _id: div._id,
      XCoordinates: div.XCoordinates,
      YCoordinates: div.YCoordinates,
    });
  }

  // na dp post fente to updatedDivs_array
  // console.log(updatedDivs_array);

  res.status(201).json({ updated_array: [...updatedDivs_array] });
};

// epidi perno to user id apo to user meso tou token sto auth middlwre exo acess sto user id !!! Afto to user id den bori na to laaksi kaneis giati to perno mesa apo token kai prin kano update to place thelo na tskero an to crateor id feild pou exo sto database teriazei me to id pou penro apo to auth middleware kai mono tote na to kano update !!

module.exports = saveDragableDivs;
