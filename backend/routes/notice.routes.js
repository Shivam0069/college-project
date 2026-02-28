const router = require("express").Router();
const controller = require("../controllers/notice.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.post("/", auth, role("admin"), controller.create);
router.get("/", auth, controller.getAll);
router.delete("/:id", auth, role("admin"), controller.delete);

module.exports = router;
