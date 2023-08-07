import Segment from "../../Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class NormalFareCalculatorHandler extends FareCalculatorHandler {

	protected FARE = 2.1;

	public handle(segment: Segment): number {
		if (!segment.isOvernight() && !segment.isSunday()) {
			return this.calculate(segment);
		}
		if (!this.next) throw new Error();
		return this.next.handle(segment);
	}

}
