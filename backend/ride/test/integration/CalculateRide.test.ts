import CalculateRide from "../../src/application/usecase/CalculateRide";

describe('Calculate Ride Integration Test', function () {

	it('should be able calculate price of ride in day', async function () {
		const input = {
			positions: [
				{ lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
				{ lat: -27.496887588317275, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
			]
		}
		const useCase = new CalculateRide();
		const output = await useCase.execute(input);
		expect(output.price).toBe(21);
	});

});

