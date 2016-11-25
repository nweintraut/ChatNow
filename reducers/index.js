import { combineReducers } from 'redux'


function name(state = '', action) {
	switch (action.type) {
		case 'UPDATE_NAME':
			return action.name
		default:
			return state
	}
} 

function accountNumber(state = '', action) {
	switch(action.type) {
		case 'UPDATE_ACCOUNT_NUMBER':
			return action.number
		default:
			return state
	}
}
function composingMessage(state = '', action) {
	switch(action.type) {
		case 'UPDATE_COMPOSE_MESSAGE':
			return action.message
		default:
			return state
	}
}
function message(state = [], action) {
	switch(action.type) {
		default:
			return state
	}
}
const chatNowReducers = combineReducers({
	name,
	accountNumber,
	composingMessage,
	message,
})

export default chatNowReducers