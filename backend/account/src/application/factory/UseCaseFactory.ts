import RepositoryFactory from "./RepositoryFactory";
import CreatePassenger from "../usecase/CreatePassenger";
import CreateDriver from "../usecase/CreateDriver";
import GetPassenger from "../usecase/GetPassenger";
import GetDriver from "../usecase/GetDriver";

export default class UseCaseFactory {

	constructor(
		private readonly repositoryFactory: RepositoryFactory,
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

}
