import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '../';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min';
import logger from '../logger/dispatch-logger';
import dispatcher from './dispatcher-mock';
import stores from './store-mock';
import Question from '../components/question';
import DevPanel from '../components/dev-panel';
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
              <MyComponent />
              <DevPanel project='focus_devtools' user='pierr'>
                <Question sendGrade={grade => console.log('gradeToSend', grade)}/>
              </DevPanel>
            </main>
            </div>,
    rootElement);
});
