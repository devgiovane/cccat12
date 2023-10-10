import Name from "../valueObject/Name.ts";
import Email from "../valueObject/Email.ts";
import Cpf from "../valueObject/Cpf.ts";
import Plate from "../valueObject/Plate.ts";

export default class Driver {

	private driverId: string;
	private readonly name: Name;
	private readonly email: Email;
	private readonly document: Cpf;
	private readonly carPlate: Plate;

	constructor(
		driverId: string,
		name: string,
		email: string,
		document: string,
		carPlate: string
	) {
		this.driverId = driverId;
		this.name = new Name(name);
		this.email = new Email(email);
		this.document = new Cpf(document);
		this.carPlate = new Plate(carPlate);
	}

	public static create(builder: DriverBuilder) {
		return new Driver(builder.driverId, builder.name, builder.email, builder.document, builder.carPlate);
	}

	public getDriverId() {
		return this.driverId;
	}

	public setDriverId(driverId: string) {
		this.driverId = driverId;
	}

	public getName() {
		return this.name;
	}

	public getEmail() {
		return this.email;
	}

	public getDocument() {
		return this.document;
	}

	public getCarPlate() {
		return this.carPlate;
	}

}

export class DriverBuilder {

	public driverId = "";
	public name = "";
	public email = "";
	public document = "";
	public carPlate = "";

	public build() {
		return Driver.create(this);
	}

}
