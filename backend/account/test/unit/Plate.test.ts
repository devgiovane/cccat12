import Plate from "../../src/domain/valueObjects/Plate";

describe('Plate Unit Test', function () {

	it('should be able create valid plate', function () {
		const email = new Plate("AAA9999");
		expect(email.getValue()).toBe("AAA9999");
	});

	it('should not be able create invalid plate', function () {
		expect(function () {
			new Plate("AAA999");
		}).toThrow(new Error("Invalid plate"));
	});

});
