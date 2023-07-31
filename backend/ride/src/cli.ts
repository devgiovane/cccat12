import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import CreatePassenger from "./application/usecase/CreatePassenger";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import CLIController from "./infra/cli/CLIController";
import NodeInputOutput from "./infra/cli/NodeInputOutput";

const connection = new PgPromiseConnection();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);

const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);

