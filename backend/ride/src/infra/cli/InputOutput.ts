type Commands = {
	[key: string]: Function
}

export default abstract class InputOutput {
	private commands: Commands = {};

	public on(command: string, callback: Function) {
		this.commands[command] = callback;
	}

	public async type(text: string) {
		const [ command ] = text.split(" ");
		if (!this.commands[command]) return;
		const params = text.replace(command, "").trim();
		await this.commands[command](params);
	}

	abstract write(text: string): void;
}
