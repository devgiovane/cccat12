import Ride from "../../src/domain/Ride";

describe('Ride Unit Test', function () {

	it('should be able calculate price of ride in day', function () {
		const ride = new Ride();
		ride.addSegment(10, new Date("2021-03-01T10:00:00"));
		expect(ride.calculate()).toBe(21);
	});

	it('should be able calculate price of ride in night', function () {
		const ride = new Ride();
		ride.addSegment(10, new Date("2021-03-01T23:00:00"));
		expect(ride.calculate()).toBe(39);
	});

	it('should be able calculate price of ride in sunday', function () {
		const ride = new Ride();
		ride.addSegment(10, new Date("2021-03-07T10:00:00"));
		expect(ride.calculate()).toBe(29);
	});

	it('should be able calculate price of ride in sunday night', function () {
		const ride = new Ride();
		ride.addSegment(10, new Date("2021-03-07T23:00:00"));
		expect(ride.calculate()).toBe(50);
	});

	it('should not be able calculate with invalid distance', function () {
		const ride = new Ride();
		expect(function () {
			ride.addSegment(-10, new Date("2021-03-01T10:00:00"))
		}).toThrowError(new Error("Invalid distance"));
	});

	it('should not be able calculate with invalid date', function () {
		const ride = new Ride();
		expect(function () {
			ride.addSegment(10, new Date("javascript"))
		}).toThrow(new Error("Invalid date"));
	});

	it('should be able calculate price of ride when day with minimal price', function () {
		const ride = new Ride();
		ride.addSegment(3, new Date("2021-03-01T10:00:00"));
		expect(ride.calculate()).toBe(10);
	});

	it('should be able calculate price of ride whit multiples segments', function () {
		const ride = new Ride();
		ride.addSegment(10, new Date("2021-03-01T10:00:00"));
		ride.addSegment(10, new Date("2021-03-01T12:00:00"));
		expect(ride.calculate()).toBe(42);
	});

});
