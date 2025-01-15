import { Router } from "express";
import CompanyController from "../controllers/company.controller";

const controller = new CompanyController();
const companyRouter = Router();

companyRouter.get('/v1/health', controller.health.bind(controller));
companyRouter.get('/v1/company', controller.get.bind(controller));
companyRouter.get('/v1/company/:id', controller.getById.bind(controller));
companyRouter.post('/v1/company', controller.create.bind(controller));
companyRouter.delete('/v1/company/:id', controller.delete.bind(controller));
companyRouter.put('/v1/company/:id', controller.update.bind(controller));
companyRouter.post('/v1/company/random', controller.createRandom.bind(controller))
companyRouter.get('/v1/generator', controller.createRandomData.bind(controller))

export default companyRouter;