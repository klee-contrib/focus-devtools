import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '../';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min';
import {init, populate} from './firebase';
import {saveAnswer, initQuestion} from '../actions/push-question-actions';
import logger from '../logger/dispatch-logger';
import dispatcher from './dispatcher-mock';
import stores from './store-mock';
import store from '../store';
import Question from '../components/question';
import DevPanel from '../components/dev-panel';
import { Provider as StoreProvider} from 'react-redux';

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
            <StoreProvider store={store}>
              <main className='mdl-layout__content'>
                  <MyComponent />
                  <DevPanel project='focus_devtools' user='pierr'>
                    <h2>{'Comment ça se passe avec Focus sur votre projet ?'}</h2>
                    <Question initQuestion={() => initQuestion()} sendGrade={grade => saveAnswer('focus_devtools', {date: new Date().getTime(), user: 'pierr', grade: grade})}/>
                  </DevPanel>
              </main>
            </StoreProvider>
            </div>,
    rootElement);
});
