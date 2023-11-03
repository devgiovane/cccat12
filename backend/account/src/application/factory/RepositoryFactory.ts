import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";

export default interface RepositoryFactory {
	createDriverRepository(): DriverRepository;
	createPassengerRepository(): PassengerRepository;
}
