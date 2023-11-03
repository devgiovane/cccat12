import Passenger from "../../src/domain/entity/Passenger.ts";

describe('Passenger Unit Test', function () {

	it('should be able create a invalid passenger', function () {
		expect(function () {
			new Passenger("", "", "", "")
		}).toThrow(new Error('Invalid name'));
	});

});
