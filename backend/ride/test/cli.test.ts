import CreatePassenger from "../src/application/usecase/CreatePassenger";
import PgPromiseConnection from "../src/infra/database/PgPromiseConnection";
import PassengerRepositoryDatabase from "../src/infra/repository/PassengerRepositoryDatabase";
import CliController from "../src/infra/cli/CliController";
import MemoryCliHandler from "../src/infra/cli/MemoryCliHandler";

describe('CLI Integration Test', function () {

	it('should be able a create passenger', async function () {
		const connection = new PgPromiseConnection();
		const passengerRepository = new PassengerRepositoryDatabase(connection);
		const createPassenger = new CreatePassenger(passengerRepository);
		const inputOutput = new MemoryCliHandler();
		new CliController(inputOutput, createPassenger);
		await inputOutput.type("create-passenger ana ana@gmail.com 83432616074");
		expect(inputOutput.output.at(0)?.passengerId).toBeDefined();
		await connection.close();
	});

});
