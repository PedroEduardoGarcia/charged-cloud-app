import { Router } from "express";
import companyRouter from "./companyRouter";

const router = Router();

router.use(companyRouter);

export default router;