import Registry from "./Registry";

export default function inject(name: string) {
	return function (target: any, propertyKey: string) {
		console.log(target, propertyKey)
	}
}
