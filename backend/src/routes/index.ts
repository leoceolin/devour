import express from "express";
import { utilsRouter } from "./utils";
import { userRouter } from "./user";
import { communityRouter } from "./community";
import { communityFullRouter } from "./communityFull";

export const apiRouter = express.Router();

apiRouter.use("/communityInfo", communityFullRouter);
apiRouter.use("/community", communityRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/utils", utilsRouter);
