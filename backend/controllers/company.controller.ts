import { NextFunction, Request, Response } from "express";
import CompanyService from "../services/company.service";

class CompanyController {
  private service = new CompanyService();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default CompanyController;