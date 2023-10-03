import Coord from "./Coord";

export default class Position {
	private readonly coord: Coord;

	constructor(
		lat: number,
		long: number,
		readonly date: Date
	) {
		this.coord = new Coord(lat, long);
	}

	public getCoord() {
		return this.coord;
	}

}
