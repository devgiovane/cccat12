import Ride from "../Ride";
import RideStatus from "./RideStatus";

export default class CompletedRideStatus extends RideStatus {
	public value: string;

	constructor(ride: Ride) {
		super(ride);
		this.value = "completed";
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
		throw new Error("Invalid status");
	}

}
