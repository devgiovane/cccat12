import RepositoryFactory from "./RepositoryFactory";
import CreatePassenger from "../usecase/CreatePassenger";
import CreateDriver from "../usecase/CreateDriver";
import GetPassenger from "../usecase/GetPassenger";
import GetDriver from "../usecase/GetDriver";
import GetRide from "../usecase/GetRide";
import CalculateRide from "../usecase/CalculateRide";
import RequestRide from "../usecase/RequestRide";

export default class UseCaseFactory {

	constructor(
		private readonly repositoryFactory: RepositoryFactory
	) {
	}

	public createCreatePassenger() {
		return new CreatePassenger(this.repositoryFactory);
	}

	public createCreateDriver() {
		return new CreateDriver(this.repositoryFactory);
	}

	public createGetPassenger() {
		return new GetPassenger(this.repositoryFactory);
	}

	public createGetDriver() {
		return new GetDriver(this.repositoryFactory);
	}

	public createCalculateRide() {
		return new CalculateRide();
	}

	public createGetRide() {
		return new GetRide(this.repositoryFactory);
	}

	public createRequestRide() {
		return new RequestRide(this.repositoryFactory);
	}

}
