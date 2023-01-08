import { Router } from "express";

import { scrapeEndpoint } from "../controllers/scrapperController";

const router = Router();

router.route("/").post(scrapeEndpoint);

export default router;
