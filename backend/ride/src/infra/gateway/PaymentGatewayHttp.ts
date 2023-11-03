import HttpClient from "../http/HttpClient";
import PaymentGateway, { Input } from "../../application/gateway/PaymentGateway";

export default class PaymentGatewayHttp implements PaymentGateway {

	constructor(private readonly httpClient: HttpClient) {
	}

	public async process(input: Input): Promise<void> {
		await this.httpClient.post("http://localhost:3001/payment/process", input);
	}

}
