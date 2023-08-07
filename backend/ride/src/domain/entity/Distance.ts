import Coord from "./Coord";

export default class Distance {

	public static calculate(from: Coord, to: Coord) {
		const earthRadius = 6371;
		const degreesToRadius = Math.PI / 180;
		const deltaLat = (to.getLat() - from.getLat()) * degreesToRadius;
		const deltaLong = (to.getLong() - to.getLong()) * degreesToRadius;
		const a =
			Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
			Math.cos(from.getLat() * degreesToRadius) *
			Math.cos(to.getLat() * degreesToRadius) *
			Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = earthRadius * c;
		return Math.round(distance);
	}

}
