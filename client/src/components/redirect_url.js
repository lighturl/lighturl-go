import React from 'react';
import { Component,PropTypes } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import ReactRedirect from 'react-redirect';
class RedirectUrl extends Component {
   componentWillMount(){
        this.props.getLongUrl(this.props.params.id)
   }

   redirectUrl(url){
       if(this.props.url.status == true){
       return (
                <div>   
            <ReactRedirect location={"http://"+url.url.data.long_url}></ReactRedirect>
                </div>
              )

       }
   }

  render() {
    return (
            <div>
            {this.redirectUrl(this.props.url)}
            </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        url:state.urls.getUrl
    }
}
export default connect(mapStateToProps,actions)(RedirectUrl)
