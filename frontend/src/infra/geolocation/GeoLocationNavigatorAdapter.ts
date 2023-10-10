import GeoLocation from "./GeoLocation.ts";
import Coord from "../../domain/valueObject/Coord.ts";

export default class GeoLocationNavigatorAdapter implements GeoLocation {

	getCoord(): Promise<Coord> {
		return new Promise(function (resolve) {
			navigator.geolocation.getCurrentPosition(function (position) {
				return resolve(new Coord(position.coords.latitude, position.coords.longitude))
			});
		})
	}

}
