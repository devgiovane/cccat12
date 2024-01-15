import UserRepository from "../repository/UserRepository";
import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";

export default interface RepositoryFactory {
	createUserRepository(): UserRepository;
	createDriverRepository(): DriverRepository;
	createPassengerRepository(): PassengerRepository;
}
