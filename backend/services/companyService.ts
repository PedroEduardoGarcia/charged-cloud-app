import { ModelStatic } from "sequelize";
import Company from "../database/models/company";
import resp from "../utils/resp";
import { CompanyGenerator } from "../utils/CompanyGenerator";

class CompanyService {
  private model: ModelStatic<Company> = Company;

  async get() {
    const companies = await this.model.findAll();
    return resp(200, companies);
  }

  async getById(id: string) {
    const company = await this.model.findOne({
      where: { id },
    });

    if (!company) {
      return resp(404, "Company not found");
    }

    return resp(200, company);
  }

  async create(data: { cnpj: string; name: string; address: string; phone: string }) {
    if (!data.cnpj || !data.name) {
      return resp(400, "CNPJ and Name are required");
    }

    const newCompany = await this.model.create({
      id: data.cnpj,
      cnpj: data.cnpj,
      name: data.name,
      address: data.address,
      phone: data.phone,
    });

    return resp(201, newCompany);
  }

  async delete(id: string) {
    const company = await this.model.findOne({
      where: { id },
    });

    if (!company) {
      return resp(404, "Company not found");
    }

    await this.model.destroy({
      where: { id },
    });

    return resp(200, "Company deleted successfully");
  }

  async update(id: string, updatedData: { name?: string; address?: string; phone?: string }) {
    const company = await this.model.findOne({
      where: { id },
    });

    if (!company) {
      return resp(404, "Company not found");
    }

    const updatedCompany = await company.update(updatedData);

    return resp(200, updatedCompany);
  }
}

export default CompanyService;