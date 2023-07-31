import morgan from "morgan";
import express, { Express, Request, Response } from "express";

import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
	private readonly server: Express;

	constructor() {
		this.server = express();
		this.server.use(express.json());
		this.server.use(morgan('⚡️[~:method] :url HTTP/:http-version :status :response-time ms'));
	}

	public on(method: string, url: string, callback: Function): void {
		// @ts-ignore
		this.server[method.toLowerCase()](url, async function (req: Request, res: Response) {
			try {
				const output = await callback({ body: req.body, params: req.params });
				return res.json(output);
			} catch (error: any) {
				return res.status(422).send(error.message);
			}
		});
	}

	public listen(port: number): void {
		this.server.listen(port, function () {
			console.log(`⚡️[~server] is running in http://localhost:${port}`)
		});
	}

}
