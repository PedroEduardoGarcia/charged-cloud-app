import { Router } from "express";
import CompanyController from "../controllers/company.controller";

const controller = new CompanyController();
const companyRouter = Router();

companyRouter.get('/company', controller.get.bind(controller));

export default companyRouter;