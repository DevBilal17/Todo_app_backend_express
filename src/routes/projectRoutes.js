const express = require("express");
const { getUserProjects, createProject, softDeleteProject } = require("../controllers/projectController");
const protect = require("../middlewares/protectMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/",protect,authorize("user"),getUserProjects)
router.post("/",protect,authorize("user"),createProject)

router.delete("/:id",protect,authorize("user"),softDeleteProject)

module.exports = router;