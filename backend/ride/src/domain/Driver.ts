import UUID from "./UUID";
import Cpf from "./Cpf";
import Email from "./Email";
import Plate from "./Plate";

export default class Driver {
	public email: Email;
	public document: Cpf;
	public plate: Plate;
	constructor(
		readonly driverId: string,
		readonly name: string,
		email: string,
		document: string,
		plate: string
	) {
		this.email = new Email(email);
		this.document = new Cpf(document);
		this.plate = new Plate(plate);
	}

	public static create (name: string, email: string, document: string, plate: string): Driver {
		const uuid = UUID.create();
		return new Driver(uuid.value, name, email, document, plate);
	}
}
