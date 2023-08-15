import Ride from "../../src/domain/entity/Ride";
import Coord from "../../src/domain/entity/Coord";

describe('Ride Unit Test', function () {

	it('should be able calculate price of ride in day', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
		ride.addPosition(-27.496887588317275, -48.545022195325124, new Date("2021-03-01T10:00:00"));
		expect(ride.calculate()).toBe(21);
	});

	it('should be able calculate price of ride in night', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T23:00:00"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T23:00:00"));
		expect(ride.calculate()).toBe(39);
	});

	it('should be able calculate price of ride in sunday', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T10:00:00"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T10:00:00"));
		expect(ride.calculate()).toBe(29);
	});

	it('should be able calculate price of ride in sunday night', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T23:00:00"));
		expect(ride.calculate()).toBe(50);
	});

	it('should not be able calculate with invalid date', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("javascript"));
		ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("javascript"));
		expect(function () {
			ride.calculate();
		}).toThrow(new Error("Invalid date"));
	});

	it('should be able calculate price of ride when day with minimal price', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
		ride.addPosition(-27.579020277800876, -48.50838017206791, new Date("2021-03-01T10:00:00"));
		expect(ride.calculate()).toBe(10);
	});

	it('should be able a request ride', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		expect(ride.status.getValue()).toBe("requested");
	});

	it('should be able a accept ride', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.accept("", new Date("2021-03-01T10:10:00"));
		expect(ride.status.getValue()).toBe("accepted");
	});

	it('should be able a start ride', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.accept("", new Date("2021-03-01T10:10:00"));
		ride.start(new Date("2021-03-01T10:20:00"));
		expect(ride.status.getValue()).toBe("in_progress");
	});

	it('should be able a end ride', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		ride.accept("", new Date("2021-03-01T10:10:00"));
		ride.start(new Date("2021-03-01T10:20:00"));
		ride.end(new Date("2021-03-01T10:40:00"));
		expect(ride.status.getValue()).toBe("completed");
	});

	it('should not be able a start ride not accepted', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		expect(() => ride.start(new Date("2021-03-01T10:40:00"))).toThrow("Invalid status");
	});

	it('should not be able a end ride not started', function () {
		const ride = Ride.create("", new Coord(0, 0), new Coord(0,0));
		expect(() => ride.end(new Date("2021-03-01T10:40:00"))).toThrow("Invalid status");
	});

});
