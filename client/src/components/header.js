import React from 'react';
import { Component } from 'react';
import Input from './input';
import ShortLink from './short_link';
export default class Header extends Component {
  render() {
    return (
        <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="main-container">
            <div className="inner cover">
              <span className="glyphicon glyphicon-link" />
              <h1>LIGHTURL</h1>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-group input-group-lg">
                  <Input />
                  </div>
                </div>
                <div className="col-lg-12">
                  <ShortLink />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
