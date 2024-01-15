import SHA1Password from "../../src/domain/valueObjects/password/SHA1Password";
import PlainPassword from "../../src/domain/valueObjects/password/PlainPassword";
import PBKDF2Password from "../../src/domain/valueObjects/password/PBKDF2Password";

describe('Password Unit Test', function () {

	it('should be able create a plain password', function () {
		const password = PlainPassword.create("123456");
		expect(password.validate("123456")).toBe(true);
	});

	it('should be able create a sha1 password', function () {
		const password = SHA1Password.create("123456");
		expect(password.validate("123456")).toBe(true);
	});

	it('should be able create a pbkdf2 password', function () {
		const password = PBKDF2Password.create("123456");
		expect(password.validate("123456")).toBe(true);
	});

});
