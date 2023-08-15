import Ride from "../Ride";
import RideStatus from "./RideStatus";
import CompletedRideStatus from "./CompletedRideStatus";

export default class InProgressRideStatus extends RideStatus {
	public value: string;

	constructor(ride: Ride) {
		super(ride);
		this.value = "in_progress";
	}

	public accept(): void {
		throw new Error("Invalid status");
	}

	public end(): void {
		this.ride.status = new CompletedRideStatus(this.ride);
	}

	public request(): void {
		throw new Error("Invalid status");
	}

	public start(): void {
		throw new Error("Invalid status");
	}

}
