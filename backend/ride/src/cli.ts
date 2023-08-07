import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import CreatePassenger from "./application/usecase/CreatePassenger";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import CliController from "./infra/cli/CliController";
import NodeCliHandler from "./infra/cli/NodeCliHandler";

const connection = new PgPromiseConnection();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);

const cliHandler = new NodeCliHandler();
new CliController(cliHandler, createPassenger);

