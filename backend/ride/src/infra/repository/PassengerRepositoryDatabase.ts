import Passenger from "../../domain/Passenger";
import DatabaseConnection from "../database/DatabaseConnection";
import PassengerRepository from "../../application/repository/PassengerRepository";

export default class PassengerRepositoryDatabase implements PassengerRepository {

	constructor(
		private readonly connection: DatabaseConnection
	) {
	}

	public async save(passenger: Passenger): Promise<void> {
		await this.connection.query("INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)", [
			passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value
		]);
	}

	public async get(passengerId: string): Promise<Passenger> {
		const [ passengerData ] = await this.connection.query("SELECT * FROM cccat12.passenger WHERE passenger_id = $1", [
			passengerId
		]);
		return new Passenger(passengerData.passenger_id, passengerData.name, passengerData.email, passengerData.document);
	}

}
