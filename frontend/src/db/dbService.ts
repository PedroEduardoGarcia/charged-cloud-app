import { db } from "./AppDatabase";

export const dbService = {
  saveCompany: async (company: any, syncStatus: string) => {
    await db.companies.put({ ...company, syncStatus, updatedAt: new Date().toISOString() });
  },
  getCompany: async (id: string) => {
    return await db.companies.get(id);
  },
  getAllCompanies: async () => {
    return await db.companies.where("syncStatus").notEqual("deleted").toArray();
  },
  deleteCompany: async (id: string) => {
    return await db.companies.delete(id);
  },
};