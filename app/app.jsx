import React from 'react';
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

// App css
import 'style!css!applicationStyles';
import Levels from './components/Levels';

render(
    <Levels/>, document.getElementById("react-container"));