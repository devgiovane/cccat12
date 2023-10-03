import {expect} from "vitest";
import Passenger from "../../src/domain/entity/Passenger.ts";


describe('Passenger Unit Test', function () {

	it('should be able create a invalid passenger', function () {
		expect(() => new Passenger("", "", "", "")).toThrow(new Error('Invalid name'));
	});

});
