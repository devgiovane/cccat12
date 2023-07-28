import pgp from "pg-promise";

import Passenger from "../../domain/Passenger";
import PassengerRepository from "../../application/repository/PassengerRepository";

export default class PassengerRepositoryDatabase implements PassengerRepository {

	constructor() {
	}

	public async save(passenger: Passenger): Promise<void> {
		const connection = pgp()("postgres://admin:admin@localhost:5432/app");
		await connection.query("INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)", [
			passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value
		]);
		await connection.$pool.end();
	}

	public async get(passengerId: string): Promise<Passenger> {
		const connection = pgp()("postgres://admin:admin@localhost:5432/app");
		const [ passengerData ] = await connection.query("SELECT * FROM cccat12.passenger WHERE passenger_id = $1", [
			passengerId
		]);
		await connection.$pool.end();
		return new Passenger(passengerData.passenger_id, passengerData.name, passengerData.email, passengerData.document);
	}

}
