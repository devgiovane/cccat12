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

	public async publish(name: string, data: object): Promise<void> {
		if (!this.connection) throw new Error("connection error");
		const channel = await this.connection.createChannel();
		await channel.assertQueue(name, { durable: true });
		channel.sendToQueue(name, Buffer.from(JSON.stringify(data)));
	}

	public async close(): Promise<void> {
		if (!this.connection) throw new Error("connection error");
		await this.connection.close();
		this.connection = null;
	}

}
