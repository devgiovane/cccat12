import GeoLocation from "./GeoLocation.ts";
import Coord from "../../domain/valueObject/Coord.ts";

export default class GeoLocationMemoryAdapter implements GeoLocation {

	async getCoord(): Promise<Coord> {
		return new Coord(-27.584905257808835, -48.545022195325124);
	}

}
