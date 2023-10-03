import axios from "axios";
import HttpClient from "./HttpClient.ts";

export default class AxiosAdapter implements HttpClient {

	public async get(url: string): Promise<any> {
		const response = await axios.get(url);
		return response.data;
	}

	public async post(url: string, body: any): Promise<any> {
		const response = await axios.post(url, body);
		return response.data;
	}

}
