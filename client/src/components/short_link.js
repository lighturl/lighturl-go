import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';
class ShortLink extends Component {

   renderUrl(url){
       if(url.status  != false){
       return(
               <div>
                  <div id="link" />
      <Link className="nav-item nav-link" to={url.url.data.short_url}>{window.location.href}{url.url.data.short_url}</Link>
                  </div>
             );
       }
   }
    
  render() {
      const {url} = this.props
    return (
            <div>
             {this.renderUrl(url)}
            </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        url:state.urls.newUrl
    }
}
export default connect(mapStateToProps,actions)(ShortLink)
