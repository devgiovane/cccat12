import crypto from "crypto";

export default class UUID {

	constructor(
		private readonly value: string
	) {
	}

	public getValue() {
		return this.value;
	}

	static create(): UUID {
		const uuid = crypto.randomUUID();
		return new UUID(uuid);
	}

}
