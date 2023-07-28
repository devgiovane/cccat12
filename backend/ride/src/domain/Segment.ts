export default class Segment {

	constructor(
		public readonly distance: number,
		private readonly date: Date
	) {
		if (!this.isValidDistance()) throw new Error("Invalid distance");
		if (!this.isValidDate()) throw new Error("Invalid date");
	}

	public isOvernight() {
		return this.date.getHours() >= 22 || this.date.getHours() <= 6;
	}

	public isSunday() {
		return this.date.getDay() === 0;
	}

	private isValidDistance() {
		return this.distance && this.distance > 0;
	}

	private isValidDate() {
		return this.date && this.date.toString() !== "Invalid Date";
	}

}
