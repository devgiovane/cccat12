export default interface QueueConnection {
	connect(): Promise<void>;
	consume(name: string, callback: Function): Promise<void>;
}
