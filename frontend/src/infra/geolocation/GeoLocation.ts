import Coord from "../../domain/valueObject/Coord.ts";

export default interface GeoLocation {
	getCoord(): Promise<Coord>;
}
