import Segment from "../../Segment";
import FareCalculator from "./FareCalculator";
import NormalFareCalculator from "./NormalFareCalculator";
import SundayFareCalculator from "./SundayFareCalculator";
import OverNightFareCalculator from "./OverNightFareCalculator";
import OverNightSundayFareCalculator from "./OverNightSundayFareCalculator";

export default class FareCalculatorFactory {

	public static create(segment: Segment): FareCalculator {
		if (segment.isOvernight() && !segment.isSunday()) {
			return new OverNightFareCalculator();
		}
		if (segment.isOvernight() && segment.isSunday()) {
			return new OverNightSundayFareCalculator();
		}
		if (!segment.isOvernight() && segment.isSunday()) {
			return new SundayFareCalculator();
		}
		if (!segment.isOvernight() && !segment.isSunday()) {
			return new NormalFareCalculator();
		}
		throw new Error("Invalid segment");
	}

}
