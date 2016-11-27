import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import App from './components/app';
import Header from './components/header';
import RedirectUrl from './components/redirect_url';
import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
<Router history ={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute  component={Header} />
          <Route path=":id" component = {RedirectUrl} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
