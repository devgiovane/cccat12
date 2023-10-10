import CalculateRide from "./application/usecase/CalculateRide";
import RequestRide from "./application/usecase/RequestRide";
import GetDriver from "./application/usecase/GetDriver";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import CreatePassenger from "./application/usecase/CreatePassenger";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import RideRepositoryDatabase from "./infra/repository/RideRepositoryDatabase";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

const connection = new PgPromiseConnection();

const rideRepository = new RideRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
const requestRide = new RequestRide(rideRepository);

const passengerRepository = new PassengerRepositoryDatabase(connection)
const getPassenger = new GetPassenger(passengerRepository);
const createPassenger = new CreatePassenger(passengerRepository);

const driverRepository = new DriverRepositoryDatabase(connection);
const getDriver = new GetDriver(driverRepository);
const createDriver = new CreateDriver(driverRepository);

const httpServer = new ExpressAdapter();
new HttpController(httpServer, calculateRide, requestRide, createDriver, getDriver, createPassenger, getPassenger);
httpServer.listen(3000);
