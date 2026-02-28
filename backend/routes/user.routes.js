const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.get("/", auth, role("admin"), controller.getAll);
router.patch("/approve/:id", auth, role("admin"), controller.approve);
router.patch("/block/:id", auth, role("admin"), controller.block);

module.exports = router;
