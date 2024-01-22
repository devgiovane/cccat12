import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

describe('API Integration Test', function () {

	it('should be able register passenger', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const response = await axios.post("http://localhost:3002/passenger", input);
		const output = response.data;
		expect(output.passengerId).toBeDefined();
	});

	it('should be able register passenger async', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		await axios.post("http://localhost:3002/passenger/async", input);
	});

	it('should be able get passenger', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const response1 = await axios.post("http://localhost:3002/passenger", input);
		const output1 = response1.data;
		const response2 = await axios.get(`http://localhost:3002/passenger/${output1.passengerId}`);
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
		const response = await axios.post("http://localhost:3002/driver", input);
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
		const response1 = await axios.post("http://localhost:3002/driver", input);
		const output1 = response1.data;
		const response2 = await axios.get(`http://localhost:3002/driver/${output1.driverId}`);
		const output2 = response2.data;
		expect(output2.name).toBe("John Doe");
		expect(output2.email).toBe("john.doe@gmail.com");
		expect(output2.document).toBe("83432616074");
		expect(output2.carPlate).toBe("AAA9999");
	});

});
