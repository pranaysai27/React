import * as ActionTypes from './ActionTypes'

export const Leaders = (state = {
	leaders: [], 
	error: null,
	isLoading: true
}, action) => {
    switch (action.type) {
        case ActionTypes.LEADERS_LOADING:
			return {...state, leaders:[], isLoading:true, errMess: null}

		case ActionTypes.ADD_LEADERS:
			return {
				...state,
				leaders: action.payload, 
				isLoading: false,
				errMess: null
			}

		case ActionTypes.LEADERS_FAILED: 
			return {
				...state, 
				leaders: [],
				isLoading: false, 
				errMess: action.payload
			}
        default:
            return state
    }
}