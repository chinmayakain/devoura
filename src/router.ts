import { Router } from "express";

import scrapperRouter from "./routes/scrapperRouter";
import dataRouter from "./routes/dataRouter";
import { healthCheck } from "./controllers/dataController";

const router = Router();

router.use("/scrapeData", scrapperRouter);
router.use("/listData", dataRouter);
router.use("/", healthCheck);

export default router;
