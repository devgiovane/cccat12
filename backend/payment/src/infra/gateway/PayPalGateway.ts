import * as crypto from "crypto";
import PaymentGateway, { Input, Output } from "../../application/gateway/PaymentGateway";

export default class PayPalGateway implements PaymentGateway {

	public async process(input: Input): Promise<Output> {
		console.log("PayPay Gateway Process");
		return {
			transactionId: crypto.randomUUID()
		}
	}

}
