type Payload = {
	body: any,
	params: any
}

export default interface HttpServer {
	on(method: string, url: string, callback: (payload: Payload) => {}): void;
	listen(port: number): void;
}
