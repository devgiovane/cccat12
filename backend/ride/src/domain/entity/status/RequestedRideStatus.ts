import Ride from "../Ride";
import RideStatus from "./RideStatus";
import AcceptedRideStatus from "./AccepetedRideStatus";

export default class RequestedRideStatus extends RideStatus {
	public value: string;

	constructor(ride: Ride) {
		super(ride);
		this.value = "requested";
	}

	public accept(): void {
		this.ride.status = new AcceptedRideStatus(this.ride);
	}

	public end(): void {
		throw new Error("Invalid status");
	}

	public request(): void {
		throw new Error("Invalid status");
	}

	public start(): void {
		throw new Error("Invalid status");
	}

}
