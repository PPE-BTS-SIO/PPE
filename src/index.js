import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';

import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

/*
The tapEventPlugin is a useful rpeplacement to the default onClick.
It removes the 300ms delay for users running apple-based software (mostly iOS).
*/
injectTapEventPlugin();

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
