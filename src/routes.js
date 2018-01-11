import React from 'react'
import { Router, Route,browserHistory, IndexRoute} from 'react-router'
import Login from './components/login';
import Dashboard from './components/dashboard';
const hash = require('./utils/hash.js');

export function requireAuth(nextState,replace)
{
    
    let token = sessionStorage.getItem('token');
    try {
    var tokenData = hash.decrypt(sessionStorage.getItem('token'));
    }
    catch(err) {
      sessionStorage.clear();
      replace('/login')
    }
    
    if(token == null){
      
      replace('/login')
    }
  

}
export function checkAuth(nextState,replace)
{
    
    let token = sessionStorage.getItem('token');
    
    if(token != null){
      replace('/dashboard')
    }
  


}
export const routes = (
  <div>
    <IndexRoute component={Login} />
    <Route path='/'  component={Login} />
    <Route path='dashboard'  component={Dashboard} onEnter={requireAuth}/>
    <Route path='login'  component={Login} onEnter={checkAuth}/>
   </div>
);
export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}