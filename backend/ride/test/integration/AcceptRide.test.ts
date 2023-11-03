import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import AccountGateway from "../../src/application/gateway/AccountGateway";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/RepositoryFactoryDatabase";
// Use Cases
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import AcceptRide from "../../src/application/usecase/AcceptRide";

let connection: DatabaseConnection;
let repositoryFactory: RepositoryFactory;
let accountGateway: AccountGateway;

describe('Accept Ride Integration Test', function () {

	beforeAll(function () {
		connection = new PgPromiseConnection();
		repositoryFactory = new RepositoryFactoryDatabase(connection);
		accountGateway = new AccountGatewayHttp(new AxiosAdapter());
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
		const outputCreatePassenger = await accountGateway.createPassenger(inputCreatePassenger);
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
		const requestRide = new RequestRide(repositoryFactory);
		const outputRequestRide = await requestRide.execute(inputRequestRide);
		const inputCreateDriver = {
			name: "John Doe",
			email: "john.doe@gmail.com",
			document: "83432616074",
			carPlate: "AAA9999"
		};
		const outputCreateDriver = await accountGateway.createDriver(inputCreateDriver);
		const inputAcceptRide = {
			rideId: outputRequestRide.rideId,
			driverId: outputCreateDriver.driverId,
			date: new Date("2021-03-01T10:10:00")
		};
		const acceptRide = new AcceptRide(repositoryFactory);
		await acceptRide.execute(inputAcceptRide);
		const getRide = new GetRide(repositoryFactory, accountGateway);
		const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
		expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
		expect(outputGetRide.status).toBe("accepted");
		expect(outputGetRide.acceptDate).toEqual(new Date("2021-03-01T10:10:00"));
	});

});
