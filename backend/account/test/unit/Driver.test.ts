import Driver from "../../src/domain/entity/Driver";

describe('Driver Unit Test', function () {

	it('should be able create a driver', function () {
		const driver = Driver.create("John Doe", "john.doe@gmail.com", "74587887803", "AAA9999");
		expect(driver.driverId).toBeDefined();
		expect(driver.name).toBe("John Doe");
		expect(driver.email.getValue()).toBe("john.doe@gmail.com");
		expect(driver.document.getValue()).toBe("74587887803");
		expect(driver.plate.getValue()).toBe("AAA9999");
	});

	it('should not be able create a driver with invalid document', function () {
		expect(function () {
			Driver.create("John Doe", "john.doe@gmail.com", "83432616076", "AAA9999");
		}).toThrow(new Error("Invalid cpf"))
	});

	it('should not be able create a driver with invalid email', function () {
		expect(function () {
			Driver.create("John Doe", "john.doe@gmail", "74587887803", "AAA9999");
		}).toThrow(new Error("Invalid email"))
	});

	it('should not be able create a driver with invalid car plate', function () {
		expect(function () {
			Driver.create("John Doe", "john.doe@gmail.com", "74587887803", "AAA999");
		}).toThrow(new Error("Invalid plate"))
	});

});
