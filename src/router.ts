import { Router } from "express";

import scrapperRouter from "./routes/scrapperRouter";
import dataRouter from "./routes/dataRouter";

const router = Router();

router.use("/scrapeData", scrapperRouter);
router.use("/listData", dataRouter);

export default router;
