import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DatabaseConnection from "../database/DatabaseConnection";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import DriverRepositoryDatabase from "./DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./PassengerRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor(
		private readonly connection: DatabaseConnection
	) {
	}

	public createDriverRepository(): DriverRepository {
		return new DriverRepositoryDatabase(this.connection);
	}

	public createPassengerRepository(): PassengerRepository {
		return new PassengerRepositoryDatabase(this.connection);
	}

}
