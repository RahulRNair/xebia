import React, { Component,PropTypes } from 'react';
import loading from '../loading.svg';
import { Button,FormGroup,Form,Col,ControlLabel,FormControl,InputGroup,Glyphicon,Row,Grid,Table,tbody,tr,td,Alert} from 'react-bootstrap';
import {PlanetSearchApi} from '../services/api'
import {login} from './login'
const hash = require('../utils/hash.js');

export default class Dashboard extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      searchData:'',
      searchStatus:false,
      cnt:0,
      count: 1,
      searchCount:0,
      page:0,
      paginationMaxPage:3,
      searchtext:'',
      message:'',
    }
  }
  componentDidMount()
  {
    clearInterval(this.timer)

  }
  componentWillMount()
  {
    clearInterval(this.timer)

  }
  tick () 
  {
    if(this.state.count ==20)
    {
      this.setState({count: 1})
      this.setState({cnt: 0})
    }
    else
    {
      this.setState({count: (this.state.count + 1)})
    }
  }
  logout()
  {
    sessionStorage.clear();
    this.context.router.replace('/login')
  }
  search(page)
  { 
    let searchtext = this.refs.search.value;
    // if(page!=this.state.page || searchtext!=this.state.searchtext)
    // {
      var tokenData = JSON.parse(hash.decrypt(sessionStorage.getItem('token')));
      
      if(this.state.cnt>15 && this.state.count<=60 && tokenData.user!='Luke Skywalker')
      {
        this.setState({message:'Exceeded the Limit, Try after Sometimes!!!'})
        
       
      }
      else{
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
        this.setState({cnt:this.state.cnt+1,message:''})
        
        this.setState({searchStatus:true})
        PlanetSearchApi(searchtext,page)
        .then((response) =>  {
          
           if(response.count>0)
           {
              this.setState({searchData:response.results,searchStatus:false,searchCount:response.count,page:page,searchtext:searchtext})
           }
           else
           {
              this.setState({searchData:'',searchStatus:false,searchCount:response.count,page:page,searchtext:searchtext})
           }
           
          }
         )
        .catch((error) => console.log("Error in search" + error))
       }
   // }
  }
  render() {
    var SearchClass = "App";
    var rowClass = "btn-warning"
    var Pagination = '';
    var TableData =  'No Result Found!!!';
    if(this.state.searchStatus)
    {
      
      TableData =  <img src={loading} className="App-loading" alt="loading" />;
    }
    else
    {
    
    if(this.state.searchData.length>0)
    {

    var maxPage = Math.floor(this.state.searchCount/10)+(this.state.searchCount%10>0?1:0);
 
    SearchClass = "App search_data"
    TableData = this.state.searchData.map((data) => {
      if(data.population>1000000000)
      {
        rowClass = "btn-danger";
      }
      else if(data.population<20000)
      {
        rowClass = "btn-success";
      }
      else if(data.population=='unknown')
      {
        rowClass = "btn-primary";
      }
      else
      {
        rowClass = "btn-warning"
      }
     return(
      <tr>
        <td>{data.name}</td>
        <td className={rowClass}>{data.population}</td>
        <td>{data.climate}</td>
       
      </tr>
     
       )
    });
    TableData = <div>
                  <span className="legend btn-danger"></span><span>Population &gt; 1000000000</span>
                  <span className="legend btn-warning"></span><span>20000 &lt; Population &lt; 1000000000</span>
                  <span className="legend btn-success"></span><span>Population &lt; 20000</span>
                  <span className="legend btn-primary"></span><span>Population Unknown</span>
                  <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        
                        <th>Name</th>
                        <th>Population</th>
                        <th>Climate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TableData}
                    </tbody>
                  </Table>
                </div>
    if(maxPage==1)
    {
      Pagination = '';
    }
    if(maxPage==2)
    {
      Pagination = <div><span onClick={this.search.bind(this,1)} className={this.state.page==1?"pagination active":"pagination"}>1</span><span onClick={this.search.bind(this,2)} className={this.state.page==2?"pagination active":"pagination"}>2</span></div>;
    }
    if(maxPage>=3)
    {
      if(this.state.page>2 && this.state.page<maxPage)
      {
        Pagination = <div><span className="pagination" onClick={this.search.bind(this,this.state.page-1)}>{this.state.page-1}</span><span  className="pagination active">{this.state.page}</span><span onClick={this.search.bind(this,this.state.page+1)} className="pagination">{this.state.page+1}</span></div>;
      }
      else if(this.state.page>2 && this.state.page==maxPage)
      {
        Pagination = <div><span className="pagination" onClick={this.search.bind(this,this.state.page-2)}>{this.state.page-2}</span><span onClick={this.search.bind(this,this.state.page-1)} className="pagination">{this.state.page-1}</span><span  className="pagination active">{this.state.page}</span></div>;
      }
      else
      {

        Pagination = <div><span className={this.state.page==1?"pagination active":"pagination"} onClick={this.search.bind(this,1)}>1</span><span onClick={this.search.bind(this,2)} className={this.state.page==2?"pagination active":"pagination"}>2</span><span onClick={this.search.bind(this,3)} className={this.state.page==3?"pagination active":"pagination"}>3</span></div>;
      }
      //Pagination = <div><span className="pagination" onClick={this.search.bind(this,this.state.page-1)}>{this.state.page-1}</span><span onClick={this.search.bind(this,this.state.page)} className="pagination">{this.state.page}</span><span onClick={this.search.bind(this,this.state.page+1)} className="pagination">{this.state.page+1}</span></div>;
    }

    
    }
    else
    {
      TableData =  'No Result Found!!!';
    }
    }
    var tokenData = JSON.parse(hash.decrypt(sessionStorage.getItem('token')));
    var messageBox = '';
    if(this.state.message!='')
    {
      messageBox = <Alert bsStyle="warning">
                    <strong>{this.state.message}</strong>
                  </Alert>
    }
    return (
      <div className={SearchClass}>
      {/*
      <p>counter:{this.state.cnt}</p>
      <p>Timer:{this.state.count}</p>
      <p>User: {sessionStorage.getItem('token')}</p>
      <p onClick={this.logout.bind(this)}>Logout</p>*/
      }
      <h1>Welcome {tokenData.user}</h1>
      <h4 className="logout" onClick={this.logout.bind(this)}>Logout</h4>
      <login/>
        <FormGroup>
          <InputGroup>
            <input className="form-control" type="text" placeholder="Search" name="search" ref="search" onChange={this.search.bind(this,1)}/>
            <InputGroup.Addon onClick={this.search.bind(this,1)}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
          
        </FormGroup>
        {messageBox}
        {TableData}
        {Pagination}
      </div>
    );
  }
}

Dashboard.contextTypes = {
    router: PropTypes.object.isRequired,
}
