import { Router } from "express";
import CompanyController from "../controllers/companyController";

const controller = new CompanyController();
const companyRouter = Router();

companyRouter.get('/health', controller.health.bind(controller));
companyRouter.get('/company', controller.get.bind(controller));
companyRouter.get('/company/:id', controller.getById.bind(controller));
companyRouter.post('/company', controller.create.bind(controller));
companyRouter.delete('/company/:id', controller.delete.bind(controller));
companyRouter.put('/company/:id', controller.update.bind(controller));
companyRouter.post('/company/random', controller.createRandom.bind(controller))

export default companyRouter;