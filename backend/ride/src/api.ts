import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UseCaseFactory from "./application/factory/UseCaseFactory";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RepositoryFactoryDatabase from "./infra/repository/RepositoryFactoryDatabase";

const connection = new PgPromiseConnection();
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const useCaseFactory = new UseCaseFactory(repositoryFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, useCaseFactory);
httpServer.listen(3000);
