import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

describe('API Integration Test', function () {

	it('should be able a process payment', async function () {
		const input = {
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			amount: 30
		};
		const response1 = await axios.post("http://localhost:3001/payment/process", input);
		const output1 = response1.data;
		const response2 = await axios.get(`http://localhost:3001/payment/transaction/${output1.transactionId}`);
		const output2 = response2.data;
		expect(output2.name).toBe(input.name);
	});

});
