import { ModelStatic } from "sequelize";
import Company from "../database/models/company";
import resp from "../utils/resp";

class CompanyService {
  private model: ModelStatic<Company> = Company;

  async get() {
    const companies = await this.model.findAll();
    return resp(200, companies);
  }
}

export default CompanyService;