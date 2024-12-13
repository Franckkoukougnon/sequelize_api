const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserById,
  createUser,
  modifyUser,
  deletedUser,
} = require("../controllers/UserController");

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", modifyUser);
router.delete("/:id", deletedUser);

module.exports = router;
