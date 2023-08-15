import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import PassengerRepository from "../../src/application/repository/PassengerRepository";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepository from "../../src/application/repository/RideRepository";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";

let connection: DatabaseConnection;
let passengerRepository: PassengerRepository;
let rideRepository: RideRepository;


describe('Request Ride Integration Test', function () {

	beforeAll(function () {
		connection = new PgPromiseConnection();
		passengerRepository = new PassengerRepositoryDatabase(connection);
		rideRepository = new RideRepositoryDatabase(connection);
	});

	afterAll(async function () {
		await connection.close();
	});

	it('should be able request a ride', async function () {
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
		expect(outputRequestRide.rideId).toBeDefined();
	});

	it('should be able get ride', async function () {
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
		const getRide = new GetRide(rideRepository);
		const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
		expect(outputGetRide.rideId).toBeDefined();
		expect(outputGetRide.status).toBe("requested");
		expect(outputGetRide.requestDate).toEqual(new Date("2021-03-01T10:00:00"));
	});

});
