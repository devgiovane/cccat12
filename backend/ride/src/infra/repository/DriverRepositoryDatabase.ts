import Driver from "../../domain/Driver";
import DatabaseConnection from "../database/DatabaseConnection";
import DriverRepository from "../../application/repository/DriverRepository";

export default class DriverRepositoryDatabase implements DriverRepository {

	constructor(
		private readonly connection: DatabaseConnection
	) {
	}

	public async save(driver: Driver): Promise<void> {
		await this.connection.query("INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)", [
			driver.driverId, driver.name, driver.email.value, driver.document.value, driver.plate.value
		]);
	}

	public async get(driverId: string): Promise<Driver> {
		const [ driverData ] = await this.connection.query("SELECT * FROM cccat12.driver WHERE driver_id = $1", [
			driverId
		]);
		return new Driver(driverData.driver_id, driverData.name, driverData.email, driverData.document, driverData.car_plate);
	}

}
