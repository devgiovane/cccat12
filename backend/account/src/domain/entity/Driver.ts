import UUID from "../valueObjects/UUID";
import Cpf from "../valueObjects/Cpf";
import Email from "../valueObjects/Email";
import Plate from "../valueObjects/Plate";

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
		return new Driver(uuid.getValue(), name, email, document, plate);
	}

}
