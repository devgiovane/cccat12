import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

describe('API Integration Test', function () {

	it('should be able calculate price of ride', async  function () {
		const input = {
			positions: [
				{ lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
				{ lat: -27.496887588317275, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
			]
		}
		const response = await axios.post("http://localhost:3000/ride/calculate", input);
		const output = response.data;
		expect(output.price).toBe(21);
	});

	it('should not be able calculate price of ride with invalid date', async  function () {
		const input = {
			positions: [
				{ lat: -27.584905257808835, long: -48.545022195325124, date: "javascript" },
				{ lat: -27.496887588317275, long: -48.545022195325124, date: "javascript" },
			]
		}
		const response = await axios.post("http://localhost:3000/ride/calculate", input);
		expect(response.status).toBe(422);
		const output = response.data;
		expect(output).toBe("Invalid date");
	});

});
