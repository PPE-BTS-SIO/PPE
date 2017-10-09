import { combineReducers } from 'redux';

import NodeServerReducer from './node_server_reducer';
import UserReducer from './user_reducer';

export default combineReducers({
	nodeServer: NodeServerReducer,
	user: UserReducer
})
