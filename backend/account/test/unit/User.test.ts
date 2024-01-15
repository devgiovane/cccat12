import User from "../../src/domain/entity/User";
import UUID from "../../src/domain/valueObjects/UUID";

describe('User Unit Test', function () {

	it('should be able create a user with plain password', function () {
		const user = User.create("john.doe@gmail.com", "123456", "plain");
		expect(user.userId).toBeDefined();
		expect(user.email.getValue()).toBe("john.doe@gmail.com");
		expect(user.password.getValue()).toBe("123456");
	});

	it('should be able create a get user with plain password', function () {
		const uuid = UUID.create();
		const user = new User(uuid.getValue(), "john.doe@gmail.com", "123456", "plain");
		expect(user.userId).toBe(uuid.getValue());
		expect(user.email.getValue()).toBe("john.doe@gmail.com");
		expect(user.password.getValue()).toBe("123456");
	});

	it('should be able create a user with encrypted password', function () {
		const user = User.create("john.doe@gmail.com", "123456", "sha1");
		expect(user.userId).toBeDefined();
		expect(user.email.getValue()).toBe("john.doe@gmail.com");
		expect(user.password.getValue()).toBe("7c4a8d09ca3762af61e59520943dc26494f8941b");
	});

	it('should be able validate a user with encrypted password', function () {
		const uuid = UUID.create();
		const user = new User(uuid.getValue(), "john.doe@gmail.com", "123456", "plain");
		expect(user.validatePassword("123456")).toBe(true);
	});

	it('should be able create a user with encrypted password pbkdf2', function () {
		const user = User.create("john.doe@gmail.com", "123456", "pbkdf2");
		expect(user.userId).toBeDefined();
		expect(user.email.getValue()).toBe("john.doe@gmail.com");
	});

	it('should be able validate a user with encrypted password pbkdf2', function () {
		const uuid = UUID.create();
		const user = new User(uuid.getValue(), "john.doe@gmail.com", "123456", "plain");
		expect(user.validatePassword("123456")).toBe(true);
	});

});
