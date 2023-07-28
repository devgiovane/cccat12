import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

describe('API Integration Test', function () {

	it('should be able calculate price of ride', async  function () {
		const input = {
			segments: [
				{ distance: 10, date: "2021-03-01T10:00:00" }
			]
		}
		const response = await axios.post("http://localhost:3000/ride/calculate", input);
		const output = response.data;
		expect(output.price).toBe(21);
	});

	it('should not be able calculate price of ride with invalid distance', async  function () {
		const input = {
			segments: [
				{ distance: -10, date: "2021-03-01T10:00:00" }
			]
		}
		const response = await axios.post("http://localhost:3000/ride/calculate", input);
		expect(response.status).toBe(422);
		const output = response.data;
		expect(output).toBe("Invalid distance");
	});

	it('should be able register passenger', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const response = await axios.post("http://localhost:3000/passenger", input);
		const output = response.data;
		expect(output.passengerId).toBeDefined();
	});

	it('should be able get passenger', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const response1 = await axios.post("http://localhost:3000/passenger", input);
		const output1 = response1.data;
		const response2 = await axios.get(`http://localhost:3000/passenger/${output1.passengerId}`);
		const output2 = response2.data;
		expect(output2.name).toBe("John Doe");
		expect(output2.email).toBe("john.doe@gmail.com");
		expect(output2.document).toBe("83432616074");
	});

	it('should be able register driver', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const response = await axios.post("http://localhost:3000/driver", input);
		const output = response.data;
		expect(output.driverId).toBeDefined();
	});

	it('should be able get driver', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const response1 = await axios.post("http://localhost:3000/driver", input);
		const output1 = response1.data;
		const response2 = await axios.get(`http://localhost:3000/driver/${output1.driverId}`);
		const output2 = response2.data;
		expect(output2.name).toBe("John Doe");
		expect(output2.email).toBe("john.doe@gmail.com");
		expect(output2.document).toBe("83432616074");
		expect(output2.carPlate).toBe("AAA9999");
	});

});
