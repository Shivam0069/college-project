const router = require("express").Router();
const controller = require("../controllers/gallery.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

router.post(
  "/",
  auth,
  role("admin"),
  upload.single("image"),
  controller.upload,
);
router.get("/", controller.getAll);
router.delete("/:id", auth, role("admin"), controller.delete);

module.exports = router;
