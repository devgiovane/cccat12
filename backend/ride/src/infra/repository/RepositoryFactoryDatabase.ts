import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DatabaseConnection from "../database/DatabaseConnection";
import RideRepository from "../../application/repository/RideRepository";
import RideRepositoryDatabase from "./RideRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor(private readonly connection: DatabaseConnection) {
	}

	public createRideRepository(): RideRepository {
		return new RideRepositoryDatabase(this.connection);
	}

}
