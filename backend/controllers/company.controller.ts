import { NextFunction, Request, Response } from "express";
import CompanyService from "../services/company.service";

class CompanyController {
  private service = new CompanyService();

  async health(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.health();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getById(id);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async createRandom(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.createRandom();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async createRandomData(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.createRandomData();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.delete(id);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const { status, message } = await this.service.update(id, updatedData);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default CompanyController;