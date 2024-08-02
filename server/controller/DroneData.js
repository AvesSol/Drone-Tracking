const DroneDataInfo = require("../models/droneDataModel");

exports.PostDroneInfo = async (req, res) => {
  console.log("the drone data is here ", req.body);
  const {
    droneName,
    droneTemp,
    droneAltitudes,
    droneLocation,
    lat,
    lng,
    flyTime,
    endTime,
  } = req.body;

  if (
    !droneName ||
    !droneTemp ||
    !droneAltitudes ||
    !droneLocation ||
    !flyTime ||
    !lat ||
    !lng ||
    !endTime
  ) {
    console.log("Some detials are missing");
    return res.status(401).json({
      success: false,
      msg: " some detials are missing ",
    });
  }

  const saveData = await DroneDataInfo.create({
    droneName,
    droneTemp,
    droneAltitudes,
    droneLocation,
    flyTime,
    endTime,
    lng,
    lat,
  });

  res.status(200).json({
    success: true,
    msg: "Data is saved successfully in the database",
    data: saveData,
  });
};

// Endpoint to fetch the latest drone data
exports.getDroneData = async (req, res) => {
    // console.log("Im here");
  const latestData = await DroneDataInfo.findOne().sort({ createdAt: -1 });
  res.status(200).send(latestData);
};
