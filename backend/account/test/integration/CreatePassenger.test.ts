import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/RepositoryFactoryDatabase";

let connection: DatabaseConnection;
let repositoryFactory: RepositoryFactory;

describe('Create Passenger Integration Test', function () {

	beforeAll(function () {
		connection = new PgPromiseConnection();
		repositoryFactory = new RepositoryFactoryDatabase(connection);
	});

	afterAll(async function () {
		await connection.close();
	});

	it('should be able create passenger', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const useCase = new CreatePassenger(repositoryFactory);
		const output = await useCase.execute(input);
		expect(output.passengerId).toBeDefined();
	});

	it('should be able get passenger', async function () {
		const input = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const useCase1 = new CreatePassenger(repositoryFactory);
		const output1 = await useCase1.execute(input);
		const useCase2 = new GetPassenger(repositoryFactory);
		const output2 = await useCase2.execute({ passengerId: output1.passengerId });
		expect(output2.name).toBe("John Doe");
		expect(output2.email).toBe("john.doe@gmail.com");
		expect(output2.document).toBe("83432616074");
	});

});
