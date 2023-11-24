import express from "express";
import versionService from "../services/versionService";
const router = express.Router();

router.use((req, res, next) => {
  console.log(`[Version] ${Date.now()}: ${req.method} ${req.url}`);
  next();
});
router.route("/version").get(async (req, res) => {
  try {
    const versions = await versionService.getVersions();
    return res.status(200).send(versions);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});
export default router;
