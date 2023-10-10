import { mount } from '@vue/test-utils';
import CreatePassenger from "../../src/view/CreatePassenger.vue";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter.ts";
import PassengerGatewayHttp from "../../src/infra/gateway/PassengerGatewayHttp.ts";

function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

describe('Create Passenger Integration Test', function () {


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

	it("should not be able create a passenger with invalid name", async function () {
		const httpClient = new AxiosAdapter();
		const passengerGateway = new PassengerGatewayHttp(httpClient);
		const wrapper = mount(CreatePassenger, {
			global: {
				provide: {
					passengerGateway
				}
			}
		});
		await wrapper.get(".passenger-name").setValue("John");
		await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
		await wrapper.get(".passenger-document").setValue("83432616074");
		await wrapper.get(".create-passenger").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid name");
	});

	it("should not be able create a passenger with invalid email", async function () {
		const httpClient = new AxiosAdapter();
		const passengerGateway = new PassengerGatewayHttp(httpClient);
		const wrapper = mount(CreatePassenger, {
			global: {
				provide: {
					passengerGateway
				}
			}
		});
		await wrapper.get(".passenger-name").setValue("John Dow");
		await wrapper.get(".passenger-email").setValue("john.doe@gmail");
		await wrapper.get(".passenger-document").setValue("83432616074");
		await wrapper.get(".create-passenger").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid email");
	});

	it("should not be able create a passenger with invalid document", async function () {
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
		await wrapper.get(".passenger-document").setValue("83432616075");
		await wrapper.get(".create-passenger").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid cpf");
	});

});
