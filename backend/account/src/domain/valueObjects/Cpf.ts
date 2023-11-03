export default class Cpf {

	constructor(
		private readonly value: string
	) {
		if (!this.validate())
			throw new Error("Invalid cpf");
	}

	private validate() {
		const cpf = this.clean(this.value);
		if (this.isValidLength(cpf)) return false;
		if (this.hasAllDigitsEqual(cpf)) return false;
		const dg1 = this.calculateDigit(cpf, 10);
		const dg2 = this.calculateDigit(cpf, 11);
		return this.extractCheckDigits(cpf) === `${dg1}${dg2}`;
	}

	private clean(cpf: string) {
		return cpf.replace('/\D/g', '');
	}

	private isValidLength(cpf: string) {
		return cpf.length !== 11;
	}

	private hasAllDigitsEqual(cpf: string) {
		const [ firstDigit ] = cpf;
		return [...cpf].every(digit => digit === firstDigit);
	}

	private calculateDigit(cpf: string, factor: number) {
		let total = 0;
		for (const digit of cpf) {
			if (factor > 1)
				total += Number(digit) * factor--;
		}
		const rest = total%11;
		return rest < 2 ? 0 : 11 - rest;
	}

	private extractCheckDigits(cpf: string) {
		return cpf.slice(9);
	}

	public getValue() {
		return this.value;
	}

}
