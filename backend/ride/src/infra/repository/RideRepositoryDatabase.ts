import Ride from "../../domain/entity/Ride";
import Coord from "../../domain/entity/Coord";
import DatabaseConnection from "../database/DatabaseConnection";
import RideRepository from "../../application/repository/RideRepository";

export default class RideRepositoryDatabase implements RideRepository {

	constructor(
		private readonly connection: DatabaseConnection
	) {
	}

	public async save(ride: Ride): Promise<void> {
		await this.connection.query(
			"INSERT INTO cccat12.ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[ride.rideId, ride.passengerId, ride.from.getLat(), ride.from.getLong(), ride.to.getLat(), ride.to.getLong(), ride.status.getValue(), ride.requestDate]
		);
	}

	public async get(rideId: string): Promise<Ride> {
		const [ rideData ] = await this.connection.query("SELECT * FROM cccat12.ride WHERE ride_id = $1", [ rideId ]);
		const ride =  new Ride(
			rideData.ride_id,
			rideData.passenger_id,
			new Coord(rideData.from_lat, rideData.from_long),
			new Coord(rideData.to_lat, rideData.to_long),
			rideData.status,
			rideData.request_date
		);
		ride.driverId = rideData.driver_id;
		ride.acceptDate = rideData.accept_date;
		ride.startDate = rideData.start_date;
		ride.endDate = rideData.end_date;
		return ride;
	}

	public async update(ride: Ride): Promise<void> {
		await this.connection.query("UPDATE cccat12.ride SET driver_id = $1, status = $2, accept_date = $3, start_date = $4, end_date = $5 WHERE ride_id = $6", [
			ride.driverId, ride.status.getValue(), ride.acceptDate, ride.startDate, ride.endDate, ride.rideId
		]);
	}

}
