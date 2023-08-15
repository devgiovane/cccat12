import Ride from "../Ride";
import RideStatus from "./RideStatus";
import InProgressRideStatus from "./InProgressRideStatus";

export default class AcceptedRideStatus extends RideStatus {
	public value: string;

	constructor(ride: Ride) {
		super(ride);
		this.value = "accepted";
	}

	public accept(): void {
		throw new Error("Invalid status");
	}

	public end(): void {
		throw new Error("Invalid status");
	}

	public request(): void {
		throw new Error("Invalid status");
	}

	public start(): void {
		this.ride.status = new InProgressRideStatus(this.ride);
	}

}
