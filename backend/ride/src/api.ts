import morgan from "morgan";
import express, { Request, Response } from "express";

import CreateDriver from "./application/usecase/CreateDriver";
import GetDriver from "./application/usecase/GetDriver";
import CalculateRide from "./application/usecase/CalculateRide";
import GetPassenger from "./application/usecase/GetPassenger";
import CreatePassenger from "./application/usecase/CreatePassenger";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

const app = express();
app.use(morgan('⚡️[~:method] :url HTTP/:http-version :status :response-time ms'));
app.use(express.json());

app.get("/health", function (_: Request, res: Response) {
	return res.json({ status: 'ok' });
});

app.post("/ride/calculate", async function (req: Request, res: Response) {
	try {
		const useCase = new CalculateRide();
		const output = await useCase.execute(req.body);
		return res.json(output);
	} catch (error: any) {
		return res.status(422).send(error.message);
	}
});

app.post("/passenger", async function (req: Request, res: Response) {
	try {
		const passengerRepository = new PassengerRepositoryDatabase();
		const useCase = new CreatePassenger(passengerRepository);
		const output = await useCase.execute(req.body);
		return res.json(output);
	} catch (error: any) {
		return res.status(422).send(error.message);
	}
});

app.get("/passenger/:passengerId", async function (req: Request, res: Response) {
	const passengerRepository = new PassengerRepositoryDatabase();
	const useCase = new GetPassenger(passengerRepository);
	const output = await useCase.execute({ passengerId: req.params.passengerId });
	return res.json(output);
});

app.post("/driver", async function (req: Request, res: Response) {
	try {
		const driverRepository = new DriverRepositoryDatabase();
		const useCase = new CreateDriver(driverRepository);
		const output = await useCase.execute(req.body);
		return res.json(output);
	} catch (error: any) {
		return res.status(422).send(error.message);
	}
});

app.get("/driver/:driverId", async function (req: Request, res: Response) {
	const driverRepository = new DriverRepositoryDatabase();
	const useCase = new GetDriver(driverRepository);
	const output = await useCase.execute({ driverId: req.params.driverId });
	console.log(output)
	return res.json(output);
});

app.listen(3000, function () {
	console.log("⚡️[~server] is running in http://localhost:3000")
});
