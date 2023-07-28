import crypto from "crypto";

export default class UUID {

	constructor(
		public readonly value: string
	) {
	}

	static create(): UUID {
		const uuid = crypto.randomUUID();
		return new UUID(uuid);
	}

}
