import express from "express";
const router = express.Router();
import { subscribeController as controller }  from "../controllers";
import { tryCatch } from "../error/tryAndCatch";

router.get("/:id", tryCatch(controller.getSubscribeUser));
router.put("/:id", tryCatch(controller.updateSubscribeUser));


export default router;