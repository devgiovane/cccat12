import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import GetDriver from "../../src/application/usecase/GetDriver";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/RepositoryFactoryDatabase";

let connection: DatabaseConnection;
let repositoryFactory: RepositoryFactory;

describe('Create Driver Integration Test', function () {

	beforeAll(function () {
		connection = new PgPromiseConnection();
		repositoryFactory = new RepositoryFactoryDatabase(connection);
	});

	afterAll(async function () {
		await connection.close();
	});

	it('should be able create driver', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const useCase = new CreateDriver(repositoryFactory);
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
		const useCase1 = new CreateDriver(repositoryFactory);
		const output1 = await useCase1.execute(input);
		const useCase2 = new GetDriver(repositoryFactory);
		const output2 = await useCase2.execute({ driverId: output1.driverId });
		expect(output2.name).toBe("John Doe");
		expect(output2.email).toBe("john.doe@gmail.com");
		expect(output2.document).toBe("83432616074");
		expect(output2.carPlate).toBe("AAA9999");
	});

});


