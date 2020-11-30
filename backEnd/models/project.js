const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectCategory: { type: String, required: true },
  projectStatus: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  // me to ref: kano to connection metaksi tou item kai tou user kai leo oti to kathe item prepei na exei to id apo to Schema User
});

module.exports = mongoose.model("Project", projectSchema);
// otan ftiaxno model vazo kaefalo grama kai eninko giati aftomata to mongoose dimiourgi to colection me mikro grama kai plithinkko gia paradigma an exo model Project to collections tah einai items (plithidikos)
