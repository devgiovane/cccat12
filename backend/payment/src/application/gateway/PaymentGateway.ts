export type Input = {
	name: string,
	email: string,
	amount: number
}

export type Output = {
	transactionId: string
}

export default interface PaymentGateway {
    process(input: Input): Promise<Output>;
}
