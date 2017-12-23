import {

	WINDOW_WIDTH_CHANGED,
	QUEUE_ACTION,
	CLEAR_QUEUED_ACTIONS

} from '../actions/types';

const initialState = {
	windowWidth: null,
	queuedActions: []

}

export default (state = initialState, action) => {
	switch (action.type) {
	case WINDOW_WIDTH_CHANGED:
		return Object.assign({}, state, { windowWidth: action.width });

	case QUEUE_ACTION: {
		const queuedActions = state.queuedActions;
		queuedActions.push(action.toDispatch);
		return Object.assign({}, state, queuedActions);
	}

	case CLEAR_QUEUED_ACTIONS:
		return Object.assign({}, state, { queuedActions: [] });

	default: return state;
	}
};
