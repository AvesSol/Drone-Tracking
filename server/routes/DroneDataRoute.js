const express = require("express");
const router  = express.Router();


const {PostDroneInfo,getDroneData}  = require("../controller/DroneData");


router.post("/postDrondata",PostDroneInfo);
router.get("/getlocation",getDroneData);


 
 
module.exports = router;