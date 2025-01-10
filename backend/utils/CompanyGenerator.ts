import CNPJUtil from "./CNPJUtil";

type AddressData = {
  streetTypes: string[];
  streetNames: string[];
  neighborhoods: string[];
  cities: Record<string, string[]>;
};

type NameData = {
  prefixes: string[];
    mainNames: {
        [industry: string]: string[];
    };
    founders: {
      firstNames: string[];
      lastNames: string[];
    };
    suffixes: {
      legal: string[];
      activity: string[];
      descriptors: string[];
    };
    connectors: string[];
    patterns: string[];
    industries: string[];
};

export class CompanyGenerator {
  private addressData: AddressData;
  private nameData: NameData;

  constructor(addressFile: string, nameFile: string) {
    this.addressData = require(addressFile);
    this.nameData = require(nameFile);
  }

  public generate() {
    const address = this.generateAddress();
    const state = address.split(' - ').pop() as string;
    const companyData = {
      cnpj: this.generateCNPJ(),
      name: this.generateName(),
      address: address,
      phone: this.generatePhone(state)
    };

    return companyData
  }

  public generateAddress(): string {
    const streetType = this.getRandomItem(this.addressData.streetTypes);
    const streetName = this.getRandomItem(this.addressData.streetNames);
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const neighborhood = this.getRandomItem(this.addressData.neighborhoods);
    const state = this.getRandomItem(Object.keys(this.addressData.cities));
    const city = this.getRandomItem(this.addressData.cities[state]);

    return `${streetType} ${streetName}, ${randomNumber} - ${neighborhood}, ${city} - ${state}`;
  }
  
  public generateCNPJ(): string {
    const cnpj = CNPJUtil.generate();

    return cnpj
  }

  public generateName(): string {
    const industry = this.getRandomItem(this.nameData.industries);
    const pattern = this.getRandomItem(this.nameData.patterns);
    let result = pattern;

    while (result.includes("{mainName}")) {
      result = result.replace("{mainName}", this.getRandomItem(this.nameData.mainNames[industry]));
    }

    const replacements: Record<
      "{prefix}" | "{suffix}" | "{connector}" | "{descriptive}" | "{founderFirstName}" | "{founderLastName}",
      string
    > = {
      "{prefix}": this.getRandomItem(this.nameData.prefixes),
      "{suffix}": this.getRandomItem([...this.nameData.suffixes.legal, ...this.nameData.suffixes.activity]),
      "{connector}": this.getRandomItem(this.nameData.connectors),
      "{descriptive}": this.getRandomItem(this.nameData.suffixes.descriptors),
      "{founderFirstName}": this.getRandomItem(this.nameData.founders.firstNames),
      "{founderLastName}": this.getRandomItem(this.nameData.founders.lastNames),
    };

    let placeholders = Object.keys(replacements).join("|");
    const regex = new RegExp(`(${placeholders})`, "g");

    result = result.replace(regex, (match) => replacements[match as keyof typeof replacements]);

    return result;
  }

  public generatePhone(state?: string): string {
    const dddMap: Record<string, number[]> = {
      SP: [11, 12, 13, 14, 15, 16, 17, 18, 19],
      RJ: [21, 22, 24],
      MG: [31, 32, 33, 34, 35, 37, 38],
      RS: [51, 53, 54, 55],
      PR: [41, 42, 43, 44, 45, 46],
      SC: [47, 48, 49],
    };
    
    const ddds = state ? dddMap[state] : Object.values(dddMap).flat();

    const randomDDD = ddds[Math.floor(Math.random() * ddds.length)];
    const isMobile = Math.random() < 0.5;

    if (isMobile) {
      const firstDigit = 9;
      const otherDigits = this.generateRandomDigits(8);
      return `(${randomDDD}) ${firstDigit}${otherDigits.slice(0, 4)}-${otherDigits.slice(4)}`;
    } else {
      const firstDigit = Math.floor(Math.random() * 4) + 2;
      const otherDigits = this.generateRandomDigits(7);
      return `(${randomDDD}) ${firstDigit}${otherDigits.slice(0, 3)}-${otherDigits.slice(3)}`;
    }
  }

  private getRandomItem<T>(items: T[]): T {
    if (!items || !Array.isArray(items)) {
      console.log(items)
      throw new Error('Array inválido passado para getRandomItem');
    }
    if (items.length === 0) {
      throw new Error('Array vazio passado para getRandomItem');
    }
    return items[Math.floor(Math.random() * items.length)];
  }

  private generateRandomDigits(length: number): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  }
}