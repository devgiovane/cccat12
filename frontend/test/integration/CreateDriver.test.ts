import { mount } from '@vue/test-utils';
import CreateDriver from "../../src/CreateDriver.vue";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter.ts";
import DriverGatewayHttp from "../../src/infra/gateway/DriverGatewayHttp.ts";

function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

it("should be able create a driver", async function () {
	const httpClient = new AxiosAdapter();
	const driverGateway = new DriverGatewayHttp(httpClient);
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-carPlate").setValue("AAA9999");
	await wrapper.get(".create-driver").trigger("click");
	await sleep(200);
	expect(wrapper.get(".driver-id").text()).toHaveLength(36);
});
