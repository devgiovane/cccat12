import Transaction from "../../domain/Transaction";
import PaymentGateway from "../gateway/PaymentGateway";
import RepositoryFactory from "../factory/RepositoryFactory";
import TransactionRepository from "../repository/TransactionRepository";

type Input = {
    name: string,
    email: string,
    amount: number
}

type Output = {
	transactionId: string
}

export default class ProcessPayment {
	private transactionRepository: TransactionRepository

    constructor(
		repositoryFactory: RepositoryFactory,
		private readonly paymentGateway: PaymentGateway,
	) {
		this.transactionRepository = repositoryFactory.createTransactionRepository();
    }

    public async execute(input: Input): Promise<Output> {
        const output = await this.paymentGateway.process(input);
        const transaction = new Transaction(output.transactionId, input.name, input.name, input.amount);
        await this.transactionRepository.save(transaction);
		return {
			transactionId: output.transactionId
		}
    }

}
