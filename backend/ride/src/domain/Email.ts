export default class Email {
	constructor(
		public readonly value: string
	) {
		if (!this.validate(value)) throw new Error("Invalid email");
	}

	private validate(email: string) {
		return email
			.toLowerCase()
			.match(
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/
			);
	}

}
