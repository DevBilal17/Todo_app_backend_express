const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     responses:
 *       200:
 *         description: Test success
 */
router.get("/test", (req, res) => res.send("Test OK"));

module.exports = router;