import Cpf from "../valueObjects/Cpf";
import Email from "../valueObjects/Email";
import UUID from "../valueObjects/UUID";

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
		return new Passenger(uuid.getValue(), name, email, document);
	}

}
