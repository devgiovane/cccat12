export default class Coord {

	constructor(
		private readonly lat: number,
		private readonly long: number
	) {
	}

	public getLat() {
		return this.lat;
	}

	public getLong() {
		return this.long;
	}

}
