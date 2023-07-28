import Cpf from "./Cpf";
import Email from "./Email";
import UUID from "./UUID";

export default class Passenger {
	public email: Email;
	public document: Cpf;
	constructor(
		readonly passengerId: string,
		readonly name: string,
		email: string,
		document: string
	) {
		this.email = new Email(email);
		this.document = new Cpf(document);
	}

	public static create (name: string, email: string, document: string): Passenger {
		const uuid = UUID.create();
		return new Passenger(uuid.value, name, email, document);
	}
}
