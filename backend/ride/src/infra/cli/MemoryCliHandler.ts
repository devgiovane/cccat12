import CliHandler from "./CliHandler";

export default class MemoryCliHandler extends CliHandler {
	public output: any = [];

	public write(text: string): void {
		this.output.push(JSON.parse(text));
	}

}
