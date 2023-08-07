import Segment from "./Segment";
import Position from "./Position";
import Distance from "./Distance";

import FareCalculatorHandler from "./fare/chain/FareCalculatorHandler";
import FareCalculatorFactory from "./fare/chain/FareCalculatorFactory";

export default class Ride {

	private static MIN_PRICE = 10;

	private readonly positions: Position[];
	private readonly fareCalculator: FareCalculatorHandler;

	constructor() {
		this.positions = [];
		this.fareCalculator = FareCalculatorFactory.create();
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
