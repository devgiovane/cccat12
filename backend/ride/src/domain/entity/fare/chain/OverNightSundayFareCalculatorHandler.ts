import Segment from "../../Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class OverNightSundayFareCalculatorHandler extends FareCalculatorHandler {

	protected FARE = 5;

	public handle(segment: Segment): number {
		if (segment.isOvernight() && segment.isSunday()) {
			return this.calculate(segment);
		}
		if (!this.next) throw new Error();
		return this.next.handle(segment);
	}

}
