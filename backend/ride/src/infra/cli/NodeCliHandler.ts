import CliHandler from "./CliHandler";

export default class NodeCliHandler extends CliHandler {

	constructor() {
		super();
		process.stdin.on("data", async (chunk) => {
			const command = chunk.toString().replace(/\n/g, "");
			await this.type(command);
		});
	}

	public write(text: string): void {
		process.stdout.write(`${text}\n`);
	}

}
