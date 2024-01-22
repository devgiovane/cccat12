import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UseCaseFactory from "./application/factory/UseCaseFactory";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RepositoryFactoryDatabase from "./infra/repository/RepositoryFactoryDatabase";
import RabbitMQConnection from "./infra/queue/RabbitMQConnection";

(async function () {
	const queueConnection = new RabbitMQConnection();
	await queueConnection.connect();
	const databaseConnection = new PgPromiseConnection();
	const repositoryFactory = new RepositoryFactoryDatabase(databaseConnection);
	const useCaseFactory = new UseCaseFactory(repositoryFactory, queueConnection);
	const httpServer = new ExpressAdapter();
	new HttpController(httpServer, useCaseFactory);
	httpServer.listen(3000);
})();

