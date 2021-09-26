import {createLogger, createStore} from 'vuex'
import game from "@/store/modules/game";
const debug = process.env.NODE_ENV !== 'production';
export default createStore({
	modules: {
		game
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
