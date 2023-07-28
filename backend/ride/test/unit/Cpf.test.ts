import Cpf from '../../src/domain/Cpf';

describe('Cpf Unit Test', function () {

	it.each([
		"83432616074",
		"74587887803",
		"87175659520"
	])('should be able contain cpf valid', function (value: string) {
		const cpf = new Cpf(value);
		expect(cpf.value).toBe(value);
	});

	it.each([
		"83432616076",
		"99999999999",
		"834326160"
	])('should not be able cpf invalid', function (value: string) {
		expect(function () {
			new Cpf(value);
		}).toThrow(new Error("Invalid cpf"));
	});

});
