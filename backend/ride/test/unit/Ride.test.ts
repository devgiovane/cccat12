import Ride from "../../src/domain/entity/Ride";

describe('Ride Unit Test', function () {

	it('should be able calculate price of ride in day', function () {
		const ride = new Ride();
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
		ride.addPosition(-27.496887588317275, -48.545022195325124, new Date("2021-03-01T10:00:00"));
		expect(ride.calculate()).toBe(21);
	});

	it('should be able calculate price of ride in night', function () {
		const ride = new Ride();
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T23:00:00"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T23:00:00"));
		expect(ride.calculate()).toBe(39);
	});

	it('should be able calculate price of ride in sunday', function () {
		const ride = new Ride();
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T10:00:00"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T10:00:00"));
		expect(ride.calculate()).toBe(29);
	});

	it('should be able calculate price of ride in sunday night', function () {
		const ride = new Ride();
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T23:00:00"));
		expect(ride.calculate()).toBe(50);
	});

	it('should not be able calculate with invalid date', function () {
		const ride = new Ride();
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("javascript"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("javascript"));
		expect(function () {
			ride.calculate();
		}).toThrow(new Error("Invalid date"));
	});

	it('should be able calculate price of ride when day with minimal price', function () {
		const ride = new Ride();
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
		ride.addPosition(-27.579020277800876, -48.50838017206791, new Date("2021-03-07T23:00:00"));
		expect(ride.calculate()).toBe(10);
	});

});
