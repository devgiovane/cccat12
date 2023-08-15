import Ride from "../Ride";
import RequestedRideStatus from "./RequestedRideStatus";
import AcceptedRideStatus from "./AccepetedRideStatus";
import InProgressRideStatus from "./InProgressRideStatus";
import CompletedRideStatus from "./CompletedRideStatus";

export default class RideStatusFactory {

	public static create(ride: Ride, status: string) {
		if (status === 'requested') {
			return new RequestedRideStatus(ride);
		}
		if (status === 'accepted') {
			return new AcceptedRideStatus(ride);
		}
		if (status === 'in_progress') {
			return new InProgressRideStatus(ride);
		}
		if (status === 'completed') {
			return new CompletedRideStatus(ride);
		}
		throw new Error('Invalid status');
	}

}
