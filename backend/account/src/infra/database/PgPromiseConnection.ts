import pgp, { IDatabase } from "pg-promise";

import DatabaseConnection from "./DatabaseConnection";

export default class PgPromiseConnection implements DatabaseConnection {

	private connection: IDatabase<{}>;

	constructor() {
		this.connection =  pgp()("postgres://admin:admin@localhost:5432/app");
	}

	public async query(statement: string, params: any): Promise<any> {
		return await this.connection.query(statement, params);
	}

	public async close(): Promise<void> {
		await this.connection.$pool.end();
	}

}
