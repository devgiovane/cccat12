import QueueConnection from "./QueueConnection";
import amqp from "amqplib";

export default class RabbitMQConnection implements QueueConnection {
	private connection: amqp.Connection | null;

	constructor() {
		this.connection = null
	}

	public async connect(): Promise<void> {
		this.connection = await amqp.connect("amqp://admin:admin@localhost:5672");
	}

	public async consume(name: string, callback: Function): Promise<void> {
		if (!this.connection) throw new Error("connection error");
		const channel = await this.connection.createChannel();
		await channel.assertQueue(name, { durable: true });
		await channel.consume(name, async function (message: amqp.ConsumeMessage | null) {
			if (!message) return;
			const input = JSON.parse(message.content.toString());
			try {
				await callback(input);
				channel.ack(message);
			} catch (error: any) {
				console.log(error.message);
			}
		});
	}

}
