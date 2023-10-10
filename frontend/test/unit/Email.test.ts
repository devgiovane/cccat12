import { expect } from "vitest";
import Email from "../../src/domain/valueObject/Email.ts";

describe('Email Unit Test', function () {

	it('should be able create valid email', function ()  {
		const email = new Email("john.doe@gmail.com");
		expect(email.getValue()).toBe("john.doe@gmail.com");
	});

	it('should be able create invalid email', function () {
		expect(function () {
			new Email("john.doe@gmail");
		}).toThrow('Invalid email');
	});

});
