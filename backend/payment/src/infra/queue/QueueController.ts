import Registry from "../di/Registry";
import QueueConnection from "./QueueConnection";

export default class QueueController {

	constructor(
		readonly queueConnection: QueueConnection,
	) {
		const registry = Registry.getInstance();
		const _ = queueConnection.consume("rideEnded", async function (body: any) {
			await registry.inject('processPayment').execute(body);
		})
	}

}
