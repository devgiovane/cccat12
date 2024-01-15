import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DatabaseConnection from "../database/DatabaseConnection";
import UserRepository from "../../application/repository/UserRepository";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import DriverRepositoryDatabase from "./DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./PassengerRepositoryDatabase";
import UserRepositoryDatabase from "./UserRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor(
		private readonly connection: DatabaseConnection
	) {
	}

	public createUserRepository(): UserRepository {
		return new UserRepositoryDatabase(this.connection);
	}

	public createDriverRepository(): DriverRepository {
		return new DriverRepositoryDatabase(this.connection);
	}

	public createPassengerRepository(): PassengerRepository {
		return new PassengerRepositoryDatabase(this.connection);
	}

}
