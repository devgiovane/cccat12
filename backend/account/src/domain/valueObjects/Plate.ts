export default class Plate {

	constructor(
		private readonly value: string
	) {
		if (!this.validate(value))
			throw new Error("Invalid plate");
	}

	private validate(plate: string) {
		return plate
			.toUpperCase()
			.match(
				/^[A-Z]{3}[0-9]{4}$/
			);
	}

	public getValue() {
		return this.value;
	}

}
