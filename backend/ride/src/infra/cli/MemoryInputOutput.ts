import InputOutput from "./InputOutput";

export default class MemoryInputOutput extends InputOutput {
	public output: Array<any> = [];
	public write(text: string): void {
		this.output.push(JSON.parse(text));
	}

}
