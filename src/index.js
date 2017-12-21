import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './app';

import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
	reducers,
	applyMiddleware(thunkMiddleware)
);

const Application = () => (
	<Provider store={store}>
		<App />
	</Provider >
);

/*
This is where we tell React to render our application.
*/
ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
