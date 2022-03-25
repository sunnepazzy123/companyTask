import express from "express";
const router = express.Router();
import { subscribeController as controller }  from "../controllers";
import { tryCatch } from "../error/tryAndCatch";
import { subscriberValidator } from "../validators";

router.get("/:id", tryCatch(controller.getSubscribeUser));
router.put("/:id", subscriberValidator, tryCatch(controller.updateSubscribeUser));


export default router;