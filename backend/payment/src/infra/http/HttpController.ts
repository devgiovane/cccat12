import HttpServer from "./HttpServer";
import Registry from "../di/Registry";

export default class HttpController {

	constructor(
		httpServer: HttpServer,
	) {
		const registry = Registry.getInstance();
		httpServer.on("POST", "/payment/process", async function ({ body }) {
			return await registry.inject('processPayment').execute(body);
		});
		httpServer.on("GET", "/payment/transaction/:transactionId", async function({ params }) {
			return await registry.inject('getTransaction').execute({ transactionId: params.transactionId });
		});
	}

}
