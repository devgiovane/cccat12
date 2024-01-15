import crypto from "crypto";

import Password from "./Password";

export default class SHA1Password implements Password {

	constructor(
		private readonly value: string,
	) {
	}

	public getSalt(): string {
		return "";
	}

	public getValue(): string {
		return this.value;
	}

	public static create(password: string) {
		const hash = crypto.createHash("sha1").update(password).digest("hex");
		return new SHA1Password(hash);
	}

	public validate(password: string): boolean {
		const hash = crypto.createHash("sha1").update(password).digest("hex");
		return this.value === hash;
	}

}
