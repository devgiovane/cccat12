import Ride from "../../domain/entity/Ride";
import Coord from "../../domain/entity/Coord";

type Input = {
	positions: Array<{
		lat: number,
		long: number,
		date: Date
	}>
}

type Output = {
	price: number
}

export default class CalculateRide {

	constructor() {
	}

	public async execute(input: Input): Promise<Output>  {
		const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
		for (const position of input.positions) {
			ride.addPosition(position.lat, position.long, new Date(position.date));
		}
		const price = ride.calculate();
		return { price };
	}

}
