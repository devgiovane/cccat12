import Ride from "../../domain/entity/Ride";

export default interface RideRepository {
	save(ride: Ride): Promise<void>;
	get(rideId: string): Promise<Ride>;
	update(ride: Ride): Promise<void>;
}
