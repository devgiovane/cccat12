import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import PassengerRepository from "../../src/application/repository/PassengerRepository";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepository from "../../src/application/repository/RideRepository";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";
import DriverRepository from "../../src/application/repository/DriverRepository";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import AcceptRide from "../../src/application/usecase/AcceptRide";

let connection: DatabaseConnection;
let passengerRepository: PassengerRepository;
let driverRepository: DriverRepository;
let rideRepository: RideRepository;


describe('Accept Ride Integration Test', function () {

	beforeAll(function () {
		connection = new PgPromiseConnection();
		passengerRepository = new PassengerRepositoryDatabase(connection);
		driverRepository = new DriverRepositoryDatabase(connection);
		rideRepository = new RideRepositoryDatabase(connection);
	});

	afterAll(async function () {
		await connection.close();
	});

	it('should be able accept a ride', async function () {
		const inputCreatePassenger = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074"
		};
		const createPassenger = new CreatePassenger(passengerRepository);
		const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);
		const inputRequestRide = {
			passengerId: outputCreatePassenger.passengerId,
			from: {
				lat: -27.584905257808835,
				long: -48.545022195325124
			},
			to: {
				lat: -27.496887588317275,
				long: -48.522234807851476
			},
			date: new Date("2021-03-01T10:00:00")
		};
		const requestRide = new RequestRide(rideRepository);
		const outputRequestRide = await requestRide.execute(inputRequestRide);
		const inputCreateDriver = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const createDriver = new CreateDriver(driverRepository);
		const outputCreateDriver = await createDriver.execute(inputCreateDriver);
		const inputAcceptRide = {
			rideId: outputRequestRide.rideId,
			driverId: outputCreateDriver.driverId,
			date: new Date("2021-03-01T10:10:00")
		};
		const acceptRide = new AcceptRide(rideRepository);
		await acceptRide.execute(inputAcceptRide);
		const getRide = new GetRide(rideRepository);
		const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
		expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
		expect(outputGetRide.status).toBe("accepted");
		expect(outputGetRide.acceptDate).toEqual(new Date("2021-03-01T10:10:00"));
	});

});
