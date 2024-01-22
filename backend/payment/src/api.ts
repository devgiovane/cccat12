import Registry from "./infra/di/Registry";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RabbitMQConnection from "./infra/queue/RabbitMQConnection";
import RepositoryFactoryDatabase from "./infra/repository/RepositoryFactoryDatabase";
import GetTransaction from "./application/usecase/GetTransaction";
import PayPalGateway from "./infra/gateway/PayPalGateway";
import ProcessPayment from "./application/usecase/ProcessPayment";
import QueueController from "./infra/queue/QueueController";

(async function () {
	const registry = Registry.getInstance();
	const connectionQueue = new RabbitMQConnection();
	await connectionQueue.connect();
	const connectionDatabase = new PgPromiseConnection();
	const repositoryFactory = new RepositoryFactoryDatabase(connectionDatabase);
	const getTransaction = new GetTransaction(repositoryFactory);
	registry.provide('getTransaction', getTransaction);
	const paymentGateway = new PayPalGateway();
	const processPayment = new ProcessPayment(repositoryFactory, paymentGateway);
	registry.provide('processPayment', processPayment);
	const httpServer = new ExpressAdapter();
	new HttpController(httpServer);
	new QueueController(connectionQueue);
	httpServer.listen(3001);
})();

