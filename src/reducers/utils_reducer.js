import {
	WINDOW_WIDTH_CHANGED
} from '../actions/types';

const initialState = {
	windowWidth: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case WINDOW_WIDTH_CHANGED:
		return Object.assign({}, state, { windowWidth: action.width })
	default: return state;
	}
};
