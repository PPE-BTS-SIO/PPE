import {
	WINDOW_WIDTH_CHANGED
} from './types';

export const changeWindowWidth = width => (dispatch) => {
	dispatch({
		type: WINDOW_WIDTH_CHANGED,
		width
	});
};
