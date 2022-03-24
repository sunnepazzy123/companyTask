import express from "express";
const router = express.Router();
import userRoutes from './users';
import subscriptionsRoutes from './subscriptions'


router.use("/auth", userRoutes);
router.use("/auth/subscription", subscriptionsRoutes);


export default router;