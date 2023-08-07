import FareCalculatorHandler from "./FareCalculatorHandler";
import NormalFareCalculatorHandler from "./NormalFareCalculatorHandler";
import SundayFareCalculatorHandler from "./SundayFareCalculatorHandler";
import OverNightFareCalculatorHandler from "./OverNightFareCalculatorHandler";
import OverNightSundayFareCalculatorHandler from "./OverNightSundayFareCalculatorHandler";

export default class FareCalculatorFactory {

	public static create(): FareCalculatorHandler {
		const overNightSundayFareCalculator = new OverNightSundayFareCalculatorHandler();
		const sundayFareCalculator = new SundayFareCalculatorHandler(overNightSundayFareCalculator);
		const overNightFareCalculator = new OverNightFareCalculatorHandler(sundayFareCalculator);
		return new NormalFareCalculatorHandler(overNightFareCalculator);
	}

}
