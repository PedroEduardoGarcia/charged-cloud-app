class CNPJUtil {
  private static readonly weights1: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  private static readonly weights2: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  private static calculateDigit(numbers: number[], weights: number[]): number {
    const weightedSum = numbers.reduce((accumulatedSum, currentDigit, index) => {
      const weightedDigit = currentDigit * weights[index];
      return accumulatedSum + weightedDigit;
    }, 0);
    const remainder = weightedSum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private static generateRandomNumbers(length: number): number[] {
      return Array.from({ length }, () => Math.floor(Math.random() * 10));
  }

  public static generate(): string {
      const firstNumbers = this.generateRandomNumbers(8);
      const baseNumbers = [...firstNumbers, 0, 0, 0, 1];
      
      const firstDigit = this.calculateDigit(baseNumbers, this.weights1);      
      const numbersWithFirstDigit = [...baseNumbers, firstDigit];
      
      const secondDigit = this.calculateDigit(numbersWithFirstDigit, this.weights2);      
      const allNumbers = [...baseNumbers, firstDigit, secondDigit];
      const cnpj = allNumbers.join('');
      
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  public static validate(cnpj: string): boolean {
      const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

      if (cleanCNPJ.length !== 14) {
          return false;
      }

      if (/^(\d)\1+$/.test(cleanCNPJ)) {
          return false;
      }

      const numbers = cleanCNPJ.split('').map(Number);
      const baseNumbers = numbers.slice(0, 12);
      const digit1 = numbers[12];
      const digit2 = numbers[13];
      const calculatedDigit1 = this.calculateDigit(baseNumbers, this.weights1);

      if (calculatedDigit1 !== digit1) {
          return false;
      }

      const calculatedDigit2 = this.calculateDigit([...baseNumbers, digit1], this.weights2);
      return calculatedDigit2 === digit2;
  }
}

export default CNPJUtil;