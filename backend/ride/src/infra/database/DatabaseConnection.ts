export default interface DatabaseConnection {
	query(statement: string, params: Array<any>): Promise<any>;
	close(): Promise<void>;
}
