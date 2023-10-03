export default interface DriverGateway {
	save(drive: any): Promise<any>;
}
