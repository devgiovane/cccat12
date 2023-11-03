import RepositoryFactory from "../factory/RepositoryFactory";
import TransactionRepository from "../repository/TransactionRepository";

type Input = {
	transactionId: string
}

type Output = {
	transactionId: string,
	name: string,
	email: string,
	amount: number
}

export default class GetTransaction {
	private transactionRepository: TransactionRepository

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.transactionRepository = repositoryFactory.createTransactionRepository();
	}

	public async execute(input: Input): Promise<Output> {
		const transaction = await this.transactionRepository.get(input.transactionId);
		return {
			transactionId: transaction.transactionId,
			name: transaction.name,
			email: transaction.email,
			amount: transaction.amount
		}
	}

}
