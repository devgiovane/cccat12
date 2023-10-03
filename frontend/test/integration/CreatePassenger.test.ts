import { mount } from '@vue/test-utils';
import CreatePassenger from "../../src/CreatePassenger.vue";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter.ts";
import PassengerGatewayHttp from "../../src/infra/gateway/PassengerGatewayHttp.ts";

function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

it("should be able create a passenger", async function () {
	const httpClient = new AxiosAdapter();
	const passengerGateway = new PassengerGatewayHttp(httpClient);
	const wrapper = mount(CreatePassenger, {
		global: {
			provide: {
				passengerGateway
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger").trigger("click");
	await sleep(200);
	expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
});
