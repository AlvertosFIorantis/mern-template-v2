const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dragableDivSchema = new Schema({
  XCoordinates: { type: String, default: "" },
  YCoordinates: { type: String, default: "" },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  // me to ref: kano to connection metaksi tou dragable di kai tou user kai leo oti to kathe item prepei na exei to id apo to Schema User
});

module.exports = mongoose.model("DragableDiv", dragableDivSchema);
// otan ftiaxno model vazo kaefalo grama kai eninko giati aftomata to mongoose dimiourgi to colection me mikro grama kai plithinkko gia paradigma an exo model Project to collections tah einai items (plithidikos)
