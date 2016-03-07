import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min';
import FocusDevTools from '../';
import {init, populate} from './firebase';
import dispatcher from './dispatcher-mock';
import stores from './store-mock';
import logger from '../logger/dispatch-logger';
const routeLogger = d => console.log('route' , d)
const strs =  {
    'person': {
      name: 'person',
      getValue: () => ({name: 'Pierre', age: 28})
    },
    'search': {
      name: 'search',
      getValue: () => ({name: 'Don diego', test: [{name: 1}, {name: 1},{name: 1},{name: 3}]})
    }
  };
const routes = [{
  route: /^help(?:\?([\s\S]*))?$/,
  callback: routeLogger
},
{
  route: /^holp(?:\?([\s\S]*))?$/,
  callback: routeLogger
},
{
  route: /^azjbnfhzbfhebhf(?:\?([\s\S]*))?$/,
  callback: routeLogger
}];



init(() => populate(false));
logger(dispatcher, () => stores);
dispatcher.dispatch({action: {type:'DON_UPDATE', data: 'DON_UPDATO', source: 'sourceAction'}});
// Create the react component when the DOM is loaded.
document.addEventListener('DOMContentLoaded', (event) => {

    const rootElement = document.querySelector(`.${__ANCHOR_CLASS__}`);
    const PAGE_TITLE = 'Great example page';
    // The child must be wrapped in a function
    // to work around an issue in React 0.13.
    ReactDOM.render(
            <div className='mdl-layout  mdl-layout--fixed-header'>
            <header className='mdl-layout__header'>
            <div className='mdl-layout__header-row'>
              <span className='mdl-layout-title'>{PAGE_TITLE}</span>
              <div className='mdl-layout-spacer'></div>
              <nav className='mdl-navigation mdl-layout--large-screen-only'>
                <a className='mdl-navigation__link' href=''>Link</a>
                <a className='mdl-navigation__link' href=''>Link</a>
                <a className='mdl-navigation__link' href=''>Link</a>
              </nav>

            </div>
            </header>
            <div className='mdl-layout__drawer'>
            <span className='mdl-layout-title'>Notification Center</span>
            <nav className='mdl-navigation'>
              <a className='mdl-navigation__link' href=''>Link</a>
              <a className='mdl-navigation__link' href=''>Link</a>
              <a className='mdl-navigation__link' href=''>Link</a>
              <a className='mdl-navigation__link' href=''>Link</a>
            </nav>
            </div>
              <main className='mdl-layout__content'>
                  <FocusDevTools
                    isPanel={true}
                    user='pierr'
                    project='focus_devtools'
                    toggleVisibilityKey='ctrl-m'
                    routes={routes}
                    stores={strs}
                    isDebugDevTools={true}
                  />
              </main>
            </div>,
    rootElement);
});
