import crypto from "crypto";

import Password from "./Password";

export default class PBKDF2Password implements Password {

	constructor(
		private readonly value: string,
		private readonly salt: string = ""
	) {
	}

	public getSalt(): string {
		return this.salt;
	}

	public getValue(): string {
		return this.value;
	}

	public static create(password: string) {
		const salt = crypto.randomBytes(20).toString("hex");
		const hash = crypto.pbkdf2Sync(password, salt, 100, 64, "sha256").toString("hex");
		return new PBKDF2Password(hash, salt);
	}

	public validate(password: string): boolean {
		const hash = crypto.pbkdf2Sync(password, this.salt, 100, 64, "sha256").toString("hex");
		return this.value === hash;
	}

}
