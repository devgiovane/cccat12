import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DatabaseConnection from "../database/DatabaseConnection";
import TransactionRepository from "../../application/repository/TransactionRepository";
import TransactionRepositoryDatabase from "./TransactionRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor(private readonly connection: DatabaseConnection) {
	}

	public createTransactionRepository(): TransactionRepository {
		return new TransactionRepositoryDatabase(this.connection);
	}

}
