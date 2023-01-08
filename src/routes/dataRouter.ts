import { Router } from "express";

import { getData } from "../controllers/dataController";

const router = Router();

router.route("/").get(getData);

export default router;
