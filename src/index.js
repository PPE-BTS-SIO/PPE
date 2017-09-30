import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*
The tapEventPlugin is a useful replacement to the default onClick.
It removes the 300ms delay for users running apple-based software (mostly iOS).
*/
injectTapEventPlugin();

/*
This is where we tell React to render our application.
*/
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
