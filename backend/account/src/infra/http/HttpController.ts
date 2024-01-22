import HttpServer from "../http/HttpServer";
import UseCaseFactory from "../../application/factory/UseCaseFactory";

export default class HttpController {

	constructor(
		readonly httpServer: HttpServer,
		readonly useCaseFactory: UseCaseFactory,
	) {
		httpServer.on("POST", "/driver", async function ({ body }) {
			return await useCaseFactory.createCreateDriver().execute(body);
		});
		httpServer.on("GET", "/driver/:driverId", async function ({ params }) {
			return await useCaseFactory.createGetDriver().execute({ driverId: params.driverId });
		});
		httpServer.on("POST", "/passenger", async function ({ body }) {
			return await useCaseFactory.createCreatePassenger().execute(body);
		});
		httpServer.on("GET", "/passenger/:passengerId", async function ({ params }) {
			return await useCaseFactory.createGetPassenger().execute({ passengerId: params.passengerId });
		});
	}

}
