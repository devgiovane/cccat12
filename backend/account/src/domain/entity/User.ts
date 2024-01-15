import Email from "../valueObjects/Email";
import UUID from "../valueObjects/UUID";
import Password from "../valueObjects/password/Password";
import PasswordFactory from "../valueObjects/password/PasswordFactory";

export default class User {
	public email: Email;
	public password: Password

	constructor(
		readonly userId: string,
		email: string,
		password: string,
		readonly passwordType: string,
		readonly salt: string = ""
	) {
		this.email = new Email(email);
		const passwordFactory = PasswordFactory.create(passwordType);
		this.password = new passwordFactory(password, salt);
	}

	public static create(email: string, password: string, passwordType: string): User {
		const uuid = UUID.create();
		const hash = PasswordFactory.create(passwordType).create(password);
		return new User(uuid.getValue(), email, hash.getValue(), passwordType, hash.getSalt());
	}

	public validatePassword(password: string): boolean {
		return this.password.validate(password);
	}

}
