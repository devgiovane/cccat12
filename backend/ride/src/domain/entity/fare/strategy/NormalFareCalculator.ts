import Segment from "../../Segment";
import FareCalculator from "./FareCalculator";

export default class NormalFareCalculator implements FareCalculator {

	private FARE = 2.1;

	public calculate(segment: Segment): number {
		return segment.distance * this.FARE;
	}

}
