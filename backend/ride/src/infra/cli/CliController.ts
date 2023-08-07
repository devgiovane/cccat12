import CliHandler from "./CliHandler";
import CreatePassenger from "../../application/usecase/CreatePassenger";

export default class CliController {

	constructor(
		cliHandler: CliHandler, createPassenger: CreatePassenger
	) {
		cliHandler.on("create-passenger", async function (params: string) {
			try {
				const [ name, email, document ] = params.split(" ");
				const output = await createPassenger.execute({ name, email, document });
				cliHandler.write(JSON.stringify(output));
			} catch (error: any) {
				cliHandler.write(JSON.stringify(error.message));
			}
		});
	}

}
