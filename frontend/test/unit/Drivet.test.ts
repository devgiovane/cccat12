import { expect } from "vitest";
import Driver from "../../src/domain/entity/Driver.ts";


describe('Driver Unit Test', function () {

	it('should not be able create a driver with invalid name', function () {
		expect(() => new Driver("", "", "", "", "")).toThrow(new Error('Invalid name'));
	});

	it('should not be able create a driver with invalid email', function () {
		expect(() => new Driver("", "John Doe", "", "", "")).toThrow(new Error('Invalid email'));
	});

	it('should not be able create a driver with invalid document', function () {
		expect(() => new Driver("", "John Doe", "john.doe@gmail.com", "", "")).toThrow(new Error('Invalid cpf'));
	});

	it('should not be able create a driver with invalid car plate', function () {
		expect(() => new Driver("", "John Doe", "john.doe@gmail.com", "83432616074", "")).toThrow(new Error('Invalid plate'));
	});

});
