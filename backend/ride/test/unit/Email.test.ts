import Email from "../../src/domain/Email";

describe('Email Unit Test', function () {

	it('should be able create valid email', function () {
		const email = new Email("john.doe@gmail.com");
		expect(email.value).toBe("john.doe@gmail.com");
	});

	it.each([
		"john.doe@gmail",
		"john.doe.com",
		"john.doe@.com"
	])('should not be able create invalid email', function (value: string) {
		expect(function () {
			new Email(value);
		}).toThrow(new Error("Invalid email"));
	});

});
