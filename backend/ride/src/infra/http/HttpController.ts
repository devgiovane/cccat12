import HttpServer from "../http/HttpServer";
import CalculateRide from "../../application/usecase/CalculateRide";
import CreateDriver from "../../application/usecase/CreateDriver";
import GetDriver from "../../application/usecase/GetDriver";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import GetPassenger from "../../application/usecase/GetPassenger";

export default class HttpController {

	constructor(
		httpServer: HttpServer,
		calculateRide: CalculateRide,
		createDriver: CreateDriver,
		getDriver: GetDriver,
		createPassenger: CreatePassenger,
		getPassenger: GetPassenger
	) {
		httpServer.on("POST", "/ride/calculate", async function ({ body }) {
			return await calculateRide.execute(body);
		});
		httpServer.on("POST", "/driver", async function ({ body }) {
			return await createDriver.execute(body);
		});
		httpServer.on("GET", "/driver/:driverId", async function ({ params }) {
			return await getDriver.execute({ driverId: params.driverId });
		});
		httpServer.on("POST", "/passenger", async function ({ body }) {
			return await createPassenger.execute(body);
		});
		httpServer.on("GET", "/passenger/:passengerId", async function ({ params }) {
			return await getPassenger.execute({ passengerId: params.passengerId });
		});
	}

}
