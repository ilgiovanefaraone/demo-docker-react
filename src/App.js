import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui-react';
import Config from './organization_config.json';
import Sidebar from './Sidebar.js';
import  * as Utils from './UtilsFunc.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        organizationConfig: null,
        definitionList:  null,
        definitionLink: ""
      }
      this.swaggerhub = this.swaggerhub.bind(this)
      this.getOrganizationData = this.getOrganizationData.bind(this)
      this.updateDefinitionLink = this.updateDefinitionLink.bind(this)
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
    fetch(this.state.organizationConfig.pathApis+"/apis.json")
    .then((response) => response.json())
    .then((data) =>{
      this.setState({
        definitionList: data.apis
      
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

  updateDefinitionLink(newLink) {

    if(!Utils.IsValidHttpUrl(newLink))
  {
    newLink=this.state.organizationConfig.pathApis+"/"+newLink;
  }
    this.setState({
      definitionLink: newLink
    })
  }


  render() {
    return (
      <div className="App">
        <Sidebar 
          organizationConfig={this.state.organizationConfig}
          definitionList={this.state.definitionList}
          updateDefinitionLink={this.updateDefinitionLink}
          getOrganizationData={this.getOrganizationData}
        />
                <div id="api-data">
          <SwaggerUI 
            url={this.state.definitionLink}
            docExpansion="list"
          />
        </div>
      </div>
    );
  }
}

export default App;
