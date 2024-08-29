const { Router } = require("express");
const fileController = require("../controllers/fileController");

const router = new Router();

router.use("*", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).render("401", { title: "401 - Unauthorized" });
  }

  next();
});

router
  .route("/upload")
  .get(fileController.fileUploadGet)
  .post(fileController.fileUploadPost);

module.exports = router;
