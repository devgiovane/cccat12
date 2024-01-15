import Password from "./Password";

export default class PlainPassword implements Password {

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

	public static create(password: string): PlainPassword {
		return new PlainPassword(password);
	}

	public validate(password: string): boolean {
		return this.value === password;
	}

}
