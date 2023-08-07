import Segment from "../../Segment";
import FareCalculator from "./FareCalculator";

export default class OverNightFareCalculator implements FareCalculator {
	private FARE = 3.9;
	public calculate(segment: Segment): number {
		return segment.distance * this.FARE;
	}

}
