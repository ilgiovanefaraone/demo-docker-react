
import React from 'react';

const APILink = props => {
    let name = props.apiLinkData.name

    /////old routing
   // let apiLink = props.apiLinkData.properties[0].url

 //   function handleClick() {
 //     props.updateDefinitionLink(apiLink)
 //   }

  return (  
    <div className="api-link">
      {name}
    </div>
  )
}

export default APILink;