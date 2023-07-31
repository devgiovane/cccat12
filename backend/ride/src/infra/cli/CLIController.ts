import InputOutput from "./InputOutput";
import CreatePassenger from "../../application/usecase/CreatePassenger";

export default class CLIController {

	constructor(
		inputOutput: InputOutput, createPassenger: CreatePassenger
	) {
		inputOutput.on("create-passenger", async function (params: any) {
			try {
				const [ name, email, document ] = params.split(" ");
				const output = await createPassenger.execute({ name, email, document });
				inputOutput.write(JSON.stringify(output));
			} catch (error: any) {
				inputOutput.write(JSON.stringify(error.message));
			}
		});
	}

}
