import Registry from "./infra/di/Registry";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RepositoryFactoryDatabase from "./infra/repository/RepositoryFactoryDatabase";
import GetTransaction from "./application/usecase/GetTransaction";
import PayPalGateway from "./infra/gateway/PayPalGateway";
import ProcessPayment from "./application/usecase/ProcessPayment";

const registry = Registry.getInstance();
const connection = new PgPromiseConnection();
const repositoryFactory = new RepositoryFactoryDatabase(connection);

const getTransaction = new GetTransaction(repositoryFactory);
registry.provide('getTransaction', getTransaction);
const paymentGateway = new PayPalGateway();
const processPayment = new ProcessPayment(repositoryFactory, paymentGateway);
registry.provide('processPayment', processPayment);

const httpServer = new ExpressAdapter();
new HttpController(httpServer);
httpServer.listen(3001);
