import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import {Router, Route, browserHistory} from 'react-router';
import AppRoutes from './routes';


const RouterPath = () => ( <Router history={browserHistory}>
					        <Route path="/" component={Login} />
					        <Route path="/login" component={Login} />
					        <Route path="/dashboard" component={Dashboard} />
					    	</Router>
    				)
ReactDOM.render(<AppRoutes/>, document.getElementById('root'));

