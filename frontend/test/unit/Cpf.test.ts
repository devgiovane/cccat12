import { expect } from "vitest";
import Cpf from "../../src/domain/valueObject/Cpf.ts";

describe('Cpf Unit Test', function () {

	it('should be able create valid document', function ()  {
		const cpf = new Cpf("74587887803");
		expect(cpf.getValue()).toBe("74587887803");
	});

	it('should be able create invalid document', function () {
		expect(function () {
			new Cpf("834326160");
		}).toThrow('Invalid cpf');
	});

});
