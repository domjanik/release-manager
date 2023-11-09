import express from "express";
import releaseService from "../services/releaseService";
import { ReleaseDTO } from "../dto/releaseDto";
import { Release } from "../dao/release";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[Releases] ${Date.now()}: ${req.method} ${req.url}`);
  next();
});
router
  .route("/releases")
  .get(async (req, res) => {
    try {
      const releases = await releaseService.getRelease();
      return res.status(200).send(releases);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Something went wrong");
    }
  })
  .post((req, res) => {
    try {
      const release = req.body as ReleaseDTO;
      releaseService.addRelease(Release.fromDTO(release));
      res.status(200).send("Added a new release");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Something went wrong");
    }
  });

export default router;
