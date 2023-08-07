import Segment from "../../Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class OverNightFareCalculatorHandler extends FareCalculatorHandler {

	protected FARE = 3.9;

	public handle(segment: Segment): number {
		if (segment.isOvernight() && !segment.isSunday()) {
			return this.calculate(segment);
		}
		if (!this.next) throw new Error();
		return this.next.handle(segment);
	}

}
