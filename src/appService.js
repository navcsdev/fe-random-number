import axios from "axios";
import {generatorQueryString} from "@/function";

export const TOKEN = 'GAME_TOKEN';

export const appService = {


	api() {
		const api = axios.create({
			baseURL: process.env.VUE_APP_API
		});
		api.interceptors.request.use(config => {
			config.headers['Content-Type'] = 'application/json';
			return config
		})
		return api;
	},

	async play(payload) {
		const res = await this.api().post("/users", JSON.stringify(payload) )
		return res
	},

	async leaderboard(filter) {
		const res = await this.api().get("/users?"+generatorQueryString(filter))
		return res.data
	}
}