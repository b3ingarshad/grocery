const express = require("express");
const router = express.Router();
const {
  getUsers,
  loginRoute,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/login", loginRoute);
router.post("/register", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
