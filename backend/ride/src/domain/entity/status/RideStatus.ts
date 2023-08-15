import Ride from "../Ride";

export default abstract class RideStatus {
	protected abstract value: string;

	protected constructor(
		readonly ride: Ride
	) {
	}

	public getValue() {
		return this.value;
	}

	public abstract request(): void;

	public abstract accept(): void;

	public abstract start(): void;

	public abstract end(): void;
}
