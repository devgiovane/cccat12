export type Input = {
	name: string,
	email: string,
	amount: number
}

export default interface PaymentGateway {
	process(input: Input): Promise<void>;
}
