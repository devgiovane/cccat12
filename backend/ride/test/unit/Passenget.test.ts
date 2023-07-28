import Passenger from "../../src/domain/Passenger";

describe('Passenger Unit Test', function () {

	it('should be able create a passenger', function () {
		const passenger = Passenger.create("John Doe", "john.doe@gmail.com", "74587887803");
		expect(passenger.passengerId).toBeDefined();
		expect(passenger.name).toBe("John Doe");
		expect(passenger.email.value).toBe("john.doe@gmail.com");
		expect(passenger.document.value).toBe("74587887803");
	});

	it('should not be able create a passenger with invalid document', function () {
		expect(function () {
			Passenger.create("John Doe", "john.doe@gmail.com", "83432616076");
		}).toThrow(new Error("Invalid cpf"))
	});

	it('should not be able create a passenger with invalid email', function () {
		expect(function () {
			Passenger.create("John Doe", "john.doe@gmail", "83432616076");
		}).toThrow(new Error("Invalid email"))
	});

});
