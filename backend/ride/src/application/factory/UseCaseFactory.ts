import RepositoryFactory from "./RepositoryFactory";
import GetRide from "../usecase/GetRide";
import CalculateRide from "../usecase/CalculateRide";
import RequestRide from "../usecase/RequestRide";
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";

export default class UseCaseFactory {

	constructor(private readonly repositoryFactory: RepositoryFactory) {
	}

	public createCalculateRide() {
		return new CalculateRide();
	}

	public createGetRide() {
		return new GetRide(this.repositoryFactory, new AccountGatewayHttp(new AxiosAdapter()));
	}

	public createRequestRide() {
		return new RequestRide(this.repositoryFactory);
	}

}
