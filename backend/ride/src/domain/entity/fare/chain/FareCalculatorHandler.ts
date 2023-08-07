import Segment from "../../Segment";

export default abstract class FareCalculatorHandler {
	protected abstract FARE: number;

	constructor(
		public readonly next?: FareCalculatorHandler
	) {
	}

	public abstract handle(segment: Segment): number;

	protected calculate(segment: Segment) {
		return segment.distance * this.FARE;
	}
}
