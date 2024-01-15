export default interface Password {
	getSalt(): string,
	getValue(): string;
	validate(password: string): boolean;
}
