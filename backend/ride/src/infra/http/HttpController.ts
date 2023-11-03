import HttpServer from "../http/HttpServer";
import UseCaseFactory from "../../application/factory/UseCaseFactory";

export default class HttpController {

	constructor(
		httpServer: HttpServer,
		useCaseFactory: UseCaseFactory,
	) {
		httpServer.on("POST", "/ride/calculate", async function ({ body }) {
			return await useCaseFactory.createCalculateRide().execute(body);
		});
		httpServer.on("POST", "/ride/request", async function ({ body }) {
			return await useCaseFactory.createRequestRide().execute(body);
		});
	}

}
