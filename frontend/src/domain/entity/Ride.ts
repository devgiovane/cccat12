import Coord from "../valueObject/Coord.ts";

export default class Ride {
	private rideId?: string;
	private readonly passengerId: string;
	private price: number;
	private readonly from: Coord;
	private readonly to: Coord;

	constructor(
		passengerId: string,
		fromLat: number,
		fromLong: number,
		toLat: number,
		toLong: number
	) {
		this.passengerId = passengerId;
		this.price = 0;
		this.from = new Coord(fromLat, fromLong);
		this.to = new Coord(toLat, toLong);
	}

	public static create(builder: RideBuilder) {
		return new Ride(builder.passengerId, builder.fromLat, builder.fromLong, builder.toLat, builder.toLong);
	}

	public getRideId() {
		return this.rideId;
	}

	public setRideId(rideId: string) {
		this.rideId = rideId;
	}

	public getPassengerId() {
		return this.passengerId;
	}

	public getFrom() {
		return this.from;
	}

	public getTo() {
		return this.to;
	}

	public getPrice() {
		return this.price;
	}

	public setPrice(price: number) {
		this.price = price;
	}
}

export class RideBuilder {
	public passengerId = "";
	public fromLat = 0;
	public fromLong = 0;
	public toLat = 0;
	public toLong = 0;

	public build() {
		return Ride.create(this);
	}

}
