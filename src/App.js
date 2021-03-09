import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui-react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
import Config from './organization_config.json';
import Sidebar from './Sidebar.js';
import  * as Utils from './UtilsFunc.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded:false,
        organizationConfig: null,
        definitionList:  null,
        definitionLink: ""
      }
      this.swaggerhub = this.swaggerhub.bind(this)
      this.getOrganizationData = this.getOrganizationData.bind(this)
      //this.updateDefinitionLink = this.updateDefinitionLink.bind(this)
    }

  componentWillMount() {
    this.setState({
      organizationConfig:  Config.orgData,
    })
  }

  swaggerhub(inputMethod, inputResource, inputParams) {
    let url = ""
    if (inputParams) {
      url = "https://api.swaggerhub.com/apis/" + inputResource + "?" + inputParams
    } else {
      url = "https://api.swaggerhub.com/apis/" + inputResource
    }
    
    return fetch(url, {
        method: inputMethod
    }).then(response => {
      if (response.ok) {
        return response.json()
      } throw new Error('There was an issue requesting the API')
    }).then(json => {
      return json
    })
  }
// per leggere il file json apislist creato in locale
  getOrganizationData() {
    fetch(this.state.organizationConfig.pathApis+"/"+this.state.organizationConfig.fileApis)
    .then((response) => response.json())
    .then((data) =>{
      this.setState({
        definitionList: data.apis,
        isloaded:true
      
     })
        
    })
  
  }
  //// per chiamare il swaggerhub con le utenze e accedere agli api creati li.  
    // getOrganizationData(organization) {
      // let inputParams = "page=0&limit=10&sort=NAME&order=ASC"
      // let inputResource = organization;
//
    // this.swaggerhub('GET', inputResource, inputParams).then(response => {  
      // this.setState({
  //      definitionList: response.apis
    //  
    // })
    // })
 // }

  //updateDefinitionLink(newLink) {

    //if(!Utils.IsValidHttpUrl(newLink))
  //{
  //  newLink=this.state.organizationConfig.pathApis+"/"+newLink;
  //}
   // this.setState({
    //  definitionLink: newLink
   // })
  //}


  render() {
//console.log(this);
const listdata=this.state;
 // console.log("list:"+listdata);
    return (
      <Router>
      <div className="App">
        <Sidebar 
          organizationConfig={this.state.organizationConfig}
          definitionList={this.state.definitionList}
          updateDefinitionLink={this.updateDefinitionLink}
          getOrganizationData={this.getOrganizationData}
        />


        <Switch>
          <Route exact path="/" children={
            <div id="api-data">
          <SwaggerUI 
            url={this.state.definitionLink}
            docExpansion="list"
          /></div>}/>
                <Route exact path="/:id" children={<Child props={listdata}/>} /> 
        </Switch>
        
      </div>
      </Router>
    );
  }


}
function Child(props) {

let { id } = useParams();
let params ="";
let pathApis="";
let listApis=props.props.definitionList;
  if( listApis ) 
{
  var element=findArrayElementByTitle(listApis,id);
  pathApis = props.props.organizationConfig.pathApis;
  if(element)
  { 
    if(!Utils.IsValidHttpUrl(element.properties[0].url))
    {
    params =pathApis+"/"+element.properties[0].url;
  }else{
    params=element.properties[0].url;
  }
}
}
  return (  
    <div id="api-data">
    <SwaggerUI 
      url={params}
      docExpansion="list"
    />
    </div>

  )
}
function findArrayElementByTitle(array, title) {
  return array.find((element) => {
    return element.name === title;
  })
}

export default App;
