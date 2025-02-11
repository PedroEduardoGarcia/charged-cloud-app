import { ModelStatic } from "sequelize";
import Company from "../database/models/company";
import resp from "../utils/resp";
import { CompanyGenerator } from "../utils/CompanyGenerator";

class CompanyService {
  private model: ModelStatic<Company> = Company;

  async health() {
    return resp(200, "API is online");
  }

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

  async createRandom() {
    const path = require('path');
    const generator: CompanyGenerator = new CompanyGenerator(path.resolve('utils/data/addresses.json'), path.resolve('utils/data/names.json'));
    const data = generator.generate();
    if (!data.cnpj || !data.name) {
      return resp(400, "CNPJ and Name are required");
    }

    const cleanCNPJ = data.cnpj.replace(/[^\d]/g, '');
    const newCompany = await this.model.create({
      id: cleanCNPJ,
      cnpj: cleanCNPJ,
      name: data.name,
      address: data.address,
      phone: data.phone,
    });

    return resp(201, newCompany);
  }

  async createRandomData() {
    console.log('HERE')
    const path = require('path');
    const generator: CompanyGenerator = new CompanyGenerator(
        path.resolve('utils/data/addresses.json'),
        path.resolve('utils/data/names.json')
    );
    const data = generator.generate();
    if (!data.cnpj || !data.name) {
        return resp(400, "CNPJ and Name are required");
    }

    const cleanCNPJ = data.cnpj.replace(/[^\d]/g, '');
    const randomCompany = {
        cnpj: cleanCNPJ,
        name: data.name,
        address: data.address,
        phone: data.phone,
    };

    return resp(200, randomCompany);
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