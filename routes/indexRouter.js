const { Router } = require("express");
const indexController = require("../controllers/indexController");

const router = Router();

router.get("/", indexController.indexGet);

router
  .route("/signup")
  .get(indexController.indexSignupGet)
  .post(indexController.indexSignupPost);

router
  .route("/login")
  .get(indexController.indexLoginGet)
  .post(indexController.indexLoginPost);

router.get("/logout", indexController.indexLogoutGet);

module.exports = router;
