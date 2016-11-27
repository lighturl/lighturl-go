import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
class Input extends Component {
   constructor(props){
	super(props);
	this.state={term:""}
	   }
   HandleInputChange(e){
       e.preventDefault()
       this.setState({
           term:e.target.value
       })
   }

   UrlHandleSubmit(e){
    e.preventDefault();
    if(validateHttp(this.state.term) == false){
        this.setState({
            term:"http://"+this.state.term
        })
    }
    this.props.postUrl(this.state.term)
   }
    
  render() {
    return (
            <form onSubmit={this.UrlHandleSubmit.bind(this)} method="post">
                    <input id="url-field" value={this.state.term} onChange={this.HandleInputChange.bind(this)} type="text" className="form-control" placeholder="Paste a link..." />
                    <span className="input-group-btn">
                      <button className="btn btn-shorten" type="submit">SHORTEN</button>
                    </span>
            </form>
    );
  }
}

function validateHttp(postUrl){
    if(postUrl.indexOf("http://") == 0 || postUrl.indexOf("https://")){
        return false;
    }
    return true;
}
export default connect(null,actions)(Input)
