//src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import app from './PixiApp';


console.log(app.view.width);
ReactDOM.render(<App />, document.getElementById('root'));
