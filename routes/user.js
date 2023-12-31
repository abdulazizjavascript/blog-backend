const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(
    advancedResults(User, null, ["first_name", "last_name", "username"]),
    getUsers
  )
  .post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
