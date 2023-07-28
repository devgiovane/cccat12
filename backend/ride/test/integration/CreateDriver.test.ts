import GetDriver from "../../src/application/usecase/GetDriver";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import DriverRepository from "../../src/application/repository/DriverRepository";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";

let driverRepository: DriverRepository;

describe('Create Driver Integration Test', function () {

	beforeAll(function () {
		driverRepository = new DriverRepositoryDatabase();
	});

	it('should be able create driver', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const useCase = new CreateDriver(driverRepository);
		const output = await useCase.execute(input);
		expect(output.driverId).toBeDefined();
	});

	it('should be able get driver', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const useCase1 = new CreateDriver(driverRepository);
		const output1 = await useCase1.execute(input);
		const useCase2 = new GetDriver(driverRepository);
		const output2 = await useCase2.execute({ driverId: output1.driverId });
		expect(output2.name).toBe("John Doe");
		expect(output2.email).toBe("john.doe@gmail.com");
		expect(output2.document).toBe("83432616074");
		expect(output2.carPlate).toBe("AAA9999");
	});

});


