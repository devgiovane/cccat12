import DatabaseConnection from "../database/DatabaseConnection";

export default class GetRideQuery {

	constructor(
		private readonly connection: DatabaseConnection
	) {
	}

	public async execute(rideId: string) {
		const [ data ] = await this.connection.query(`
			SELECT e.ride_id, r.status, p.name as passenger_name, d.name as driver_name
			FROM cccat12.ride r
			JOIN cccat12.passenger p USING (passenger_id) 
			LEFT JOIN cccat12.driver d USING (driver_id)
			WHERE r.ride_id = $1
		`, [ rideId ]);
		return data;
	}

}
