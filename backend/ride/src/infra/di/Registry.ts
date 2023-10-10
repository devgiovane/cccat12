export default class Registry {
	private static instance: Registry;
	private readonly dependencies: { [name: string]: any };

	private constructor() {
		this.dependencies = {};
	}

	public static getInstance() {
		if (!Registry.instance) {
			Registry.instance = new Registry();
		}
		return Registry.instance;
	}

	public provide(name: string, dependency: any) {
		this.dependencies[name] = dependency;
	}

	public inject(name: string) {
		return this.dependencies[name];
	}

}
