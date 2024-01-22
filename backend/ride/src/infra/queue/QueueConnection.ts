export default interface QueueConnection {
	connect(): Promise<void>;
	publish(name: string, data: object): Promise<void>;
	close(): Promise<void>;
}
