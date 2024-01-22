import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UseCaseFactory from "./application/factory/UseCaseFactory";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RepositoryFactoryDatabase from "./infra/repository/RepositoryFactoryDatabase";

const databaseConnection = new PgPromiseConnection();
const repositoryFactory = new RepositoryFactoryDatabase(databaseConnection);
const useCaseFactory = new UseCaseFactory(repositoryFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, useCaseFactory);
httpServer.listen(3002);

