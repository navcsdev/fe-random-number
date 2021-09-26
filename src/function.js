import {useStore} from "vuex";
import {ref} from "vue";

export function generatorQueryString(term) {
	let queryStr = '';
	if (term) {
		Object.keys(term).forEach(key => {
			if (term[key]) {
				if (key === 'paginationPage') {
					queryStr += `&offset=${(term.paginationPage - 1) * term.paginationSize}`;
				} else if (key === 'paginationSize') {
					queryStr += `&max=${term[key]}`;
				} else if (key === 'key') {
					const temp = term[key];
					Object.keys(temp).forEach(k => {
						queryStr += `&${k}=${temp[k]}`;
					});
				} else {
					queryStr += `&${key}=${term[key]}`;
				}
			}
		});
	}
	return queryStr;
}



export const paginationEvent = (ACTION) => {
	const store = useStore()
	const filter = ref({
		paginationPage: 1,
		paginationSize: 10,
	})

	const handleUpdatePage = function (event) {
		filter.value.paginationPage = event;
		store.dispatch(ACTION, filter.value)
	};
	const handleUpdateSize = function (event) {
		filter.value.paginationPage = 1;
		filter.value.paginationSize = Number(event);
		store.dispatch(ACTION, filter.value);
	};
	const paginationLoad = () => {
		store.dispatch(ACTION, filter.value)
	}
	paginationLoad()
	return {
		filter,
		handleUpdateSize,
		handleUpdatePage,
		paginationLoad,
	}
}
