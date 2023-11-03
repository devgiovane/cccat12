import Transaction from "../../domain/Transaction";
import DatabaseConnection from "../database/DatabaseConnection";
import TransactionRepository from "../../application/repository/TransactionRepository";

export default class TransactionRepositoryDatabase implements TransactionRepository {


	constructor(private readonly connection: DatabaseConnection) {
	}

	public async save(transaction: Transaction): Promise<void> {
		await this.connection.query("insert into cccat12.transaction (transaction_id, name, email, amount) values ($1, $2, $3, $4)", [
			transaction.transactionId, transaction.name, transaction.email, transaction.amount
		]);
	}

	public async get(transactionId: string): Promise<Transaction> {
		const [ transactionData ] = await this.connection.query("SELECT * FROM cccat12.transaction WHERE transaction_id = $1", [
			transactionId
		]);
		return new Transaction(transactionData.transaction_id, transactionData.name, transactionData.email, transactionData.amount);
	}

}
