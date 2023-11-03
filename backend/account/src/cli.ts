import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CliController from "./infra/cli/CliController";
import NodeCliHandler from "./infra/cli/NodeCliHandler";
import RepositoryFactoryDatabase from "./infra/repository/RepositoryFactoryDatabase";

const connection = new PgPromiseConnection();
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const createPassenger = new CreatePassenger(repositoryFactory);

const cliHandler = new NodeCliHandler();
new CliController(cliHandler, createPassenger);

