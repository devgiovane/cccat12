import Segment from "../../Segment";
import FareCalculator from "./FareCalculator";

export default class OverNightSundayFareCalculator implements FareCalculator {
	private FARE = 5;
	public calculate(segment: Segment): number {
		return segment.distance * this.FARE;
	}

}
