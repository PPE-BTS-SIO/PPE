import { combineReducers } from 'redux';

import MainReducer from './main_reducer';
import NodeServerReducer from './node_server_reducer';
import UserReducer from './user_reducer';
import UtilsReducer from './utils_reducer';

export default combineReducers({
	main: MainReducer,
	nodeServer: NodeServerReducer,
	user: UserReducer,
	utils: UtilsReducer
})
