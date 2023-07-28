import pgp from "pg-promise";

import Driver from "../../domain/Driver";
import DriverRepository from "../../application/repository/DriverRepository";

export default class DriverRepositoryDatabase implements DriverRepository {

	constructor() {
	}

	public async save(driver: Driver): Promise<void> {
		const connection = pgp()("postgres://admin:admin@localhost:5432/app");
		await connection.query("INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)", [
			driver.driverId, driver.name, driver.email.value, driver.document.value, driver.plate.value
		]);
		await connection.$pool.end();
	}

	public async get(driverId: string): Promise<Driver> {
		const connection = pgp()("postgres://admin:admin@localhost:5432/app");
		const [ driverData ] = await connection.query("SELECT * FROM cccat12.driver WHERE driver_id = $1", [
			driverId
		]);
		await connection.$pool.end();
		return new Driver(driverData.driver_id, driverData.name, driverData.email, driverData.document, driverData.car_plate);
	}

}
