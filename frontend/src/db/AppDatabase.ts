import Dexie, { Table } from 'dexie';

export interface Company {
  id: string;
  cnpj: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string; 
  updatedAt: string;
  syncStatus: string;
}

export class AppDatabase extends Dexie {
  companies!: Table<Company>;

  constructor() {
    super('AppDatabase');

    this.version(1).stores({
      companies: 'id, cnpj, name, address, phone, createdAt, updatedAt, syncStatus',
    });


    this.companies.mapToClass(class {
      syncStatus = 'synced';
    });
  }
}

export const db = new AppDatabase();
