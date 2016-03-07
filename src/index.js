import React , { Component , PropTypes } from 'react';
import { Provider as StoreProvider} from 'react-redux';
import {saveAnswer, initQuestion} from './actions/push-question-actions';
import store from './store';
import FocusDevToolsContent from './components/focus-dev-tools';
import DevPanel from './components/dev-panel';
import  FocusDevDock from './components/focus-dev-dock';

const FocusDevToolsPanel  = (props) => {
  const {toggleVisibilityKey, ...otherProps} = props;
  return (
    <FocusDevDock toggleVisibilityKey={toggleVisibilityKey}>
      <FocusDevToolsContent {...otherProps} />
    </FocusDevDock>
  );
};
FocusDevToolsPanel.displayName = 'FocusDevToolsPanel';


export const FocusDevTools = (props) => {
  const DevTools = props.isPanel ? FocusDevToolsPanel : FocusDevToolsContent;
  return (
    <DevPanel project={props.project} user={props.user}>
      <StoreProvider store={store}>
        <DevTools
          stores={props.stores}
          routes={props.routes}
          contentWidth={props.isPanel ? '100%' : '350px'}
          toggleVisibilityKey={props.toggleVisibilityKey}
          initQuestion={() => initQuestion()}
          sendGrade={grade => saveAnswer(props.project, {date: new Date().getTime(), user: props.user, grade: grade})}
        />
      </StoreProvider>
    </DevPanel>
  );
}

FocusDevTools.displayName = 'FocusDevTools';
export default FocusDevTools;
