import React, { Component, PropTypes } from 'react';
import {LoginApi} from '../services/api'
import { Button,FormGroup,Form,Col,ControlLabel,FormControl} from 'react-bootstrap';
const hash = require('../utils/hash.js');

export default class Login extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      loginstatus:false,
      errormsg:0,
      msg:''
    }
  }
  login(nextState,replace)
  {
    this.setState({loginstatus:"pending"})
    
    var username = this.refs.uname.value;
    var password = this.refs.pwd.value;
    LoginApi(username,password)
    .then((response) =>  {
       if(response.count==0)
       {
        this.setState({msg:"Username Or Password is wrong!!!",loginstatus:"failed"})
       }
       else if(response.count==1)
       {

         if(response.results[0].name===username && response.results[0].birth_year===password)
         {
          var tokenString = {"user":username,"created":response.results[0].created,"edited":response.results[0].edited}
          let Token = hash.encrypt(JSON.stringify(tokenString));

          
          sessionStorage.setItem('token',Token);
          this.context.router.replace('/dashboard')
          
         }
         else
         {
          this.setState({msg:"Username Or Password is wrong!!!",loginstatus:"failed"})
          
         }

        
       }
       else
       {
        var resultData = response.results;
        function checkData(result) {
        if(result.name ==  username &&  result.pwd == password)
        {
          return result.name;
        }
        }
        if(resultData.find(checkData)!=undefined)
        {
        var tokenString = {"user":username,"created":resultData.find(checkData).created,"edited":resultData.find(checkData).edited}
          let Token = hash.encrypt(JSON.stringify(tokenString));

          
          sessionStorage.setItem('token',Token);
          this.context.router.replace('/dashboard')
        }
        else
        {
          this.setState({msg:"Username Or Password is wrong!!!",loginstatus:"failed"})
        }
       }
       
      }
     )
    .catch((error) => {
      this.setState({msg:"Something went wrong!!!"})
      

    })

    
  }
  render() {
    var loginButton = "primary";
    var loginText = "Login";
    if(this.state.loginstatus==='pending')
    {
      loginText = 'Login.....';
      loginButton = "primary disabled_button";
    }
    else
    {
      loginText = 'Login';
      loginButton = "primary";
    }
    
    return (
     
      <div className="App">
        <Form horizontal>
          
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <input className="form-control" type="email" placeholder="Username" name="uname" ref="uname" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <input className="form-control"  type="password" placeholder="Password" name="pwd" ref="pwd"/>
            </Col>
          </FormGroup>
          <p className="redText">{this.state.msg}</p>
          

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle={loginButton} onClick={this.login.bind(this)}>{loginText}</Button>
            </Col>
          </FormGroup>
        </Form>
        
       
        
      </div>
    );
  }
}
Login.contextTypes = {
    router: PropTypes.object.isRequired,
}
