import CalculateRide from "../../src/application/usecase/CalculateRide";

describe('Calculate Ride Integration Test', function () {

	it('should be able calculate price of ride in day', async function () {
		const input = {
			segments: [
				{ distance: 10, date: new Date("2021-03-01T10:00:00") }
			]
		}
		const useCase = new CalculateRide();
		const output = await useCase.execute(input);
		expect(output.price).toBe(21);
	});

});

