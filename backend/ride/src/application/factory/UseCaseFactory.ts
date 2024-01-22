import RepositoryFactory from "./RepositoryFactory";
import GetRide from "../usecase/GetRide";
import RequestRide from "../usecase/RequestRide";
import CalculateRide from "../usecase/CalculateRide";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import QueueConnection from "../../infra/queue/QueueConnection";
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";

export default class UseCaseFactory {

	constructor(
		private readonly repositoryFactory: RepositoryFactory,
		private readonly queueRepository: QueueConnection
	) {
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

	public createEndRide() {
	}

}
