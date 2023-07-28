import Segment from "./Segment";

export default class Ride {
	private static MIN_PRICE = 10;
	private static NORMAL_FARE = 2.1;
	private static SUNDAY_FARE = 2.9
	private static OVERNIGHT_FARE = 3.90;
	private static OVERNIGHT_SUNDAY_FARE = 5;

	private readonly segments: Segment[];

	constructor() {
		this.segments = [];
	}

	public addSegment(distance: number, date: Date) {
		this.segments.push(new Segment(distance, date));
	}

	public calculate() {
		let price = 0;
		for (const segment of this.segments) {
			if (segment.isOvernight() && !segment.isSunday()) {
				price += segment.distance * Ride.OVERNIGHT_FARE;
			}
			if (segment.isOvernight() && segment.isSunday()) {
				price += segment.distance * Ride.OVERNIGHT_SUNDAY_FARE;
			}
			if (!segment.isOvernight() && segment.isSunday()) {
				price += segment.distance * Ride.SUNDAY_FARE;
			}
			if (!segment.isOvernight() && !segment.isSunday()) {
				price += segment.distance * Ride.NORMAL_FARE;
			}
		}
		return price < Ride.MIN_PRICE ? Ride.MIN_PRICE : price;
	}
}
