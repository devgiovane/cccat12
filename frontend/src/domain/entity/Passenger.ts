import Name from "../valueObject/Name.ts";
import Email from "../valueObject/Email.ts";
import Cpf from "../valueObject/Cpf.ts";

export default class Passenger {

	private passengerId: string;
	private readonly name: Name;
	private readonly email: Email;
	private readonly document: Cpf;

	constructor(
		passengerId: string,
		name: string,
		email: string,
		document: string
	) {
		this.passengerId = passengerId;
		this.name = new Name(name);
		this.email = new Email(email);
		this.document = new Cpf(document);
	}

	public static create(builder: PassengerBuilder) {
		return new Passenger(builder.passengerId, builder.name, builder.email, builder.document);
	}

	public getPassengerId() {
		return this.passengerId;
	}

	public setPassengerId(passengerId: string) {
		this.passengerId = passengerId;
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

}

export class PassengerBuilder {

	public passengerId = "";
	public name = "";
	public email = "";
	public document = "";

	public build() {
		return Passenger.create(this);
	}

}
