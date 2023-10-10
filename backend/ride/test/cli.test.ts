import CreatePassenger from "../src/application/usecase/CreatePassenger";
import PgPromiseConnection from "../src/infra/database/PgPromiseConnection";
import CliController from "../src/infra/cli/CliController";
import MemoryCliHandler from "../src/infra/cli/MemoryCliHandler";
import RepositoryFactoryDatabase from "../src/infra/repository/RepositoryFactoryDatabase";

describe('CLI Integration Test', function () {

	it('should be able a create passenger', async function () {
		const connection = new PgPromiseConnection();
		const repositoryFactory = new RepositoryFactoryDatabase(connection);
		const createPassenger = new CreatePassenger(repositoryFactory);
		const inputOutput = new MemoryCliHandler();
		new CliController(inputOutput, createPassenger);
		await inputOutput.type("create-passenger ana ana@gmail.com 83432616074");
		expect(inputOutput.output.at(0)?.passengerId).toBeDefined();
		await connection.close();
	});

});
