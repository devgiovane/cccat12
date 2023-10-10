import { mount  } from '@vue/test-utils';
import AxiosAdapter from "../../src/infra/http/AxiosAdapter.ts";
import PassengerRide from "../../src/view/PassengerRide.vue";
import CreatePassenger from "../../src/view/CreatePassenger.vue";
import RideGateway from "../../src/infra/gateway/RideGateway.ts";
import RideGatewayHttp from "../../src/infra/gateway/RideGatewayHttp.ts";
import PassengerGatewayHttp from "../../src/infra/gateway/PassengerGatewayHttp.ts";
import GeoLocation from "../../src/infra/geolocation/GeoLocation.ts";
import GeoLocationMemoryAdapter from "../../src/infra/geolocation/GeoLocationMemoryAdapter.ts";

function sleep(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

interface LocalTestContext {
	geoLocation: GeoLocation
	rideGateway: RideGateway,
}

describe('Passenger Ride Integration Test', function () {

	beforeEach<LocalTestContext>(function (context) {
		context.geoLocation = new GeoLocationMemoryAdapter();
		context.rideGateway = new RideGatewayHttp(new AxiosAdapter());
	});

	it<LocalTestContext>('should be able a calculate price of ride', async function ({ rideGateway, geoLocation })  {
		const wrapper = mount(PassengerRide, {
			global: {
				provide: {
					rideGateway, geoLocation
				}
			}
		});
		await wrapper.get('.ride-from-lat').setValue("-27.584905257808835");
		await wrapper.get('.ride-from-long').setValue("-48.545022195325124");
		await wrapper.get('.ride-to-lat').setValue("-27.496887588317275");
		await wrapper.get('.ride-to-long').setValue("-48.545022195325124");
		await wrapper.get('.calculate-ride-button').trigger("click");
		await sleep(200);
		expect(wrapper.get(".ride-price").text()).toBe("21");
	});

	it<LocalTestContext>('should be able a request ride', async function ({ rideGateway, geoLocation }) {
		const httpClient = new AxiosAdapter();
		const passengerGateway = new PassengerGatewayHttp(httpClient);
		const wrapperCreatePassenger = mount(CreatePassenger, {
			global: {
				provide: {
					passengerGateway
				}
			}
		});
		await wrapperCreatePassenger.get(".passenger-name").setValue("John Doe");
		await wrapperCreatePassenger.get(".passenger-email").setValue("john.doe@gmail.com");
		await wrapperCreatePassenger.get(".passenger-document").setValue("83432616074");
		await wrapperCreatePassenger.get(".create-passenger").trigger("click");
		await sleep(200);
		const passengerId = wrapperCreatePassenger.get(".passenger-id").text();
		const wrapperPassengerRide = mount(PassengerRide, {
			global: {
				provide: {
					rideGateway, geoLocation
				}
			}
		});
		await wrapperPassengerRide.get(".ride-passenger-id").setValue(passengerId);
		await wrapperPassengerRide.get('.ride-from-lat').setValue("-27.584905257808835");
		await wrapperPassengerRide.get('.ride-from-long').setValue("-48.545022195325124");
		await wrapperPassengerRide.get('.ride-to-lat').setValue("-27.496887588317275");
		await wrapperPassengerRide.get('.ride-to-long').setValue("-48.545022195325124");
		await wrapperPassengerRide.get('.calculate-ride-button').trigger("click");
		await sleep(200);
		await wrapperPassengerRide.get('.request-ride-button').trigger("click");
		await sleep(200);
		expect(wrapperPassengerRide.get(".ride-id").text()).toHaveLength(36);
	});

});
