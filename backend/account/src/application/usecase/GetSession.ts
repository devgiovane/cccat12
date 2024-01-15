import Token from "../../domain/service/Token";

type Input = {
	token: string
}

type Output = {
	email: string
}

export default class GetSession {

	public async execute(input: Input): Promise<Output> {
		const payload = Token.verify("secrete", input.token);
		return {
			email: payload.email
		}
	}

}
