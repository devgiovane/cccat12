import { expect } from "vitest";
import Name from "../../src/domain/valueObject/Name.ts";

describe('Name Unit Test', function () {

	it('should be able create valid name', function () {
		const name = new Name("John Doe");
		expect(name.getValue()).toBe("John Doe");
	});

	it('should not be able create invalid name', function () {
		expect(function () {
			new Name("John")
		}).toThrow('Invalid name');
	});

});
