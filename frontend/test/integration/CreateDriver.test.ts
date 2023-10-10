import { it, describe, beforeAll } from "vitest";
import { mount } from '@vue/test-utils';
import CreateDriver from "../../src/view/CreateDriver.vue";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter.ts";
import DriverGatewayHttp from "../../src/infra/gateway/DriverGatewayHttp.ts";

function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

describe('Create Driver Integration Test', function () {

	beforeAll(function () {
		
	});

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

	it("should not be able create a driver with name invalid", async function () {
		const httpClient = new AxiosAdapter();
		const driverGateway = new DriverGatewayHttp(httpClient);
		const wrapper = mount(CreateDriver, {
			global: {
				provide: {
					driverGateway
				}
			}
		});
		await wrapper.get(".driver-name").setValue("John");
		await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
		await wrapper.get(".driver-document").setValue("83432616074");
		await wrapper.get(".driver-carPlate").setValue("AAA9999");
		await wrapper.get(".create-driver").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid name");
	});

	it("should not be able create a driver with email invalid", async function () {
		const httpClient = new AxiosAdapter();
		const driverGateway = new DriverGatewayHttp(httpClient);
		const wrapper = mount(CreateDriver, {
			global: {
				provide: {
					driverGateway
				}
			}
		});
		await wrapper.get(".driver-name").setValue("John Dow");
		await wrapper.get(".driver-email").setValue("john.doe@gmail");
		await wrapper.get(".driver-document").setValue("83432616074");
		await wrapper.get(".driver-carPlate").setValue("AAA9999");
		await wrapper.get(".create-driver").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid email");
	});

	it("should not be able create a driver with document invalid", async function () {
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
		await wrapper.get(".driver-document").setValue("83432616075");
		await wrapper.get(".driver-carPlate").setValue("AAA9999");
		await wrapper.get(".create-driver").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid cpf");
	});

	it("should not be able create a driver with car plate invalid", async function () {
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
		await wrapper.get(".driver-carPlate").setValue("AAA999");
		await wrapper.get(".create-driver").trigger("click");
		expect(wrapper.get(".error").text()).toBe("Invalid plate");
	});

})

