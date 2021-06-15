const express = require("express");
const {
  getAdopted,
  AdoptedPetByUser,
  deleteAdopted,
} = require("../controllers/adoptedControllers");
const verifyToken = require("../controllers/AuthToken");
const router = express.Router();

router.get("/adopted", getAdopted);
router.post("/createAdopted/:id", verifyToken, AdoptedPetByUser);
router.delete("/delete", deleteAdopted);

module.exports = router;
