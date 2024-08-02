const mongoose = require("mongoose");

const droneDataSchema = mongoose.Schema({
  droneName: {
    type: String,
    require: true,
  },
  droneTemp: {
    type: Number,
  },
  droneAltitudes: {
    type: Number,
  },
  droneLocation: {
    type: String,
  },
  lat:{
    type:Number
  },
  lng:{
    type:Number
  },
  flyTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
}, { timestamps: true });

module.exports = new mongoose.model("DroneDataInfo", droneDataSchema);
