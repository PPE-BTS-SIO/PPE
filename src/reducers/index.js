import { combineReducers } from 'redux';

import NodeServerReducer from './node_server_reducer';

export default combineReducers({
	nodeServer: NodeServerReducer
})
