import {appService} from "@/appService";

const states = {
	leaderBoards: {}
}

const actions = {
	getLeaderBoard(context, filter) {
		appService.leaderboard(filter).then(res => {
			context.commit('setLeaderBoard', res)
		})
	}
}

const mutations = {
	setLeaderBoard(state, data) {
		state.leaderBoards = data
	}
}


export default {
	states,
	actions,
	mutations,
	namespaced: false
}