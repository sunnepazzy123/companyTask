import express from "express";
const router = express.Router();
import userRoutes from './users';
import subscriptionsRoutes from './subscriptions'

/**
 * GET /api/auth
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
router.use("/auth", userRoutes);
router.use("/auth/subscription", subscriptionsRoutes);


export default router;