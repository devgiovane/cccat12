export default class Name {

	constructor(private readonly value: string) {
		if (!this.validate(value))
			throw new Error('Invalid name');
	}

	private validate(value: string) {
		return value
			.toLowerCase()
			.match(
				/^[a-z]+\s([a-z]+){1,}$/
			);
	}

	public getValue() {
		return this.value;
	}
}
