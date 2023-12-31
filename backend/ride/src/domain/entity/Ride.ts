import Coord from "./Coord";
import Segment from "./Segment";
import Position from "./Position";
import Distance from "./Distance";
import UUID from "../valueObjects/UUID";
import RideStatus from "./status/RideStatus";

import RideStatusFactory from "./status/RideStatusFactory";
import FareCalculatorHandler from "./fare/chain/FareCalculatorHandler";
import FareCalculatorFactory from "./fare/chain/FareCalculatorFactory";

export default class Ride {

	private static MIN_PRICE = 10;

	private readonly positions: Position[];
	private readonly fareCalculator: FareCalculatorHandler;

	public driverId?: string;
	public acceptDate?: Date;
	public startDate?: Date;
	public endDate?: Date;
	public status: RideStatus;

	constructor(
		readonly rideId: string,
		readonly passengerId: string,
		readonly from: Coord,
		readonly to: Coord,
		status: string,
		readonly requestDate: Date
	) {
		this.positions = [];
		this.fareCalculator = FareCalculatorFactory.create();
		this.status = RideStatusFactory.create(this, status);
	}

	public static create(passengerId: string, from: Coord, to: Coord, requestDate: Date = new Date()): Ride {
		const uuid = UUID.create();
		const status = "requested";
		return new Ride(uuid.value, passengerId, from, to, status, requestDate);
	}

	public accept(driverId: string, date: Date) {
		this.status.accept();
		this.driverId = driverId;
		this.acceptDate = date;
	}

	public start(date: Date) {
		this.status.start();
		this.startDate = date;
	}

	public end(date: Date) {
		this.status.end();
		this.endDate = date;
	}

	public addPosition(lat: number, long: number, date: Date) {
		this.positions.push(new Position(lat, long, date));
	}

	public calculate() {
		let price = 0;
		for (const [index, position] of this.positions.entries()) {
			const nextPosition = this.positions[index + 1];
			if (!nextPosition) break;
			const distance = Distance.calculate(position.getCoord(), nextPosition.getCoord());
			const segment = new Segment(distance, nextPosition.date);
			price += this.fareCalculator.handle(segment);
		}
		return price < Ride.MIN_PRICE ? Ride.MIN_PRICE : price;
	}

}
