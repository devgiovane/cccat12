import PlainPassword from "./PlainPassword";
import SHA1Password from "./SHA1Password";
import PBKDF2Password from "./PBKDF2Password";

export default class PasswordFactory {

	public static create(passwordType: string) {
		if (passwordType === "plain") return PlainPassword;
		if (passwordType === "sha1") return SHA1Password;
		if (passwordType === "pbkdf2") return PBKDF2Password;
		throw new Error("invalid password type");
 	}

}
