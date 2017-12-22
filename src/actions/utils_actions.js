import {

	WINDOW_WIDTH_CHANGED,
	QUEUE_ACTION,
	CLEAR_QUEUED_ACTIONS

} from './types';

export const changeWindowWidth = width => (dispatch) => {
	dispatch({
		type: WINDOW_WIDTH_CHANGED,
		width
	});
};

export const queueAction = action => (dispatch) => {
	dispatch({
		type: QUEUE_ACTION,
		toDispatch: action
	})
}

export const clearQueuedActions = () => dispatch => dispatch({
	type: CLEAR_QUEUED_ACTIONS
});

export const dispatchQueuedActions = () => (dispatch, getState) => {
	const { utils } = getState();
	if (!utils || !utils.queuedActions || utils.queuedActions.length < 1) return false;
	utils.queuedActions.forEach((action) => {
		dispatch(action());
	});
	dispatch(clearQueuedActions());
	return true;
}
