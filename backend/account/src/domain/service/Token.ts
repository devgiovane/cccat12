import { sign, verify } from "jsonwebtoken";

export default class Token {

	public static create(key: string, email: string, date: Date): string {
		const expiresIn = 3600;
		return sign({ email, iat: date.getTime(), expiresIn }, key);
	}

	public static verify(key: string, token: string): any {
		return verify(token, key);
	}

}
