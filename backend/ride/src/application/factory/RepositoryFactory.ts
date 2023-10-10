import RideRepository from "../repository/RideRepository";
import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";

export default interface RepositoryFactory {
	createRideRepository(): RideRepository;
	createDriverRepository(): DriverRepository;
	createPassengerRepository(): PassengerRepository;
}
