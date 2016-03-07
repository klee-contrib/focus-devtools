// react and redux utils
import React, {Component, PropTypes} from 'react';
import {connect as connectToReduxStore } from 'react-redux';
import SwitchActivator from './settings/switch-activator';
// get internal components
import Code from './code'
import Average from './push-question/average';
import Grade from './push-question/grade'
import Routes from './routes';
import FluxStores from './flux-stores';
import {setRouteMode, setFluxStoreMode} from '../actions/dev-tools-settings-actions';
const DevTool = ({grade, onSetGrade, onSendGrade, styleProps, mode, stores, routes}) => {
  switch(mode) {
    case 'question':
      return <Grade value={grade} maxGrade={5} onChange={onSetGrade} onClick={onSetGrade} onSend={onSendGrade} {...styleProps}/>;
    case 'flux':
      return <FluxStores stores={stores} {...styleProps}/>;
    case 'routes':
      return <Routes data={routes} {...styleProps}/>;
    default:
      return <div>Empty</div>;
  };
};
DevTool.displayName = 'DevTool';
DevTool.PropTypes = {
  grade: PropTypes.number,
  onSetGrade: PropTypes.func.isRequired,
  onSendGrade: PropTypes.func.isRequired,
  styleProps: PropTypes.object,
  mode: PropTypes.string.isRequired,
  stores: PropTypes.object.isRequired,
  roures: PropTypes.array.isRequired
}


class FocusDevTools extends Component {
  constructor(props){
    super(props);
    this.state = {grade: this.props.grade};
    this.setGrade.bind(this);
    this.setAnswer.bind(this);
  }
  componentWillMount(){
    this.props.dispatch(this.props.initQuestion())
  }
  setGrade(value){
      this.setState({grade: value});
  }
  setAnswer(value){
    console.log('answser', value);
  }
  onSend(){
    this.props.dispatch(this.props.sendGrade(this.state.grade));
  }

  render(){
    const {dispatch,isQuestionVisible, isRoutesVisible, isFluxStoresVisible, contentWidth, titlePadding, isDebugDevTools, isSwitchMode, stores, routes} = this.props;
    const codeProps = {state: this.state, props: this.props};
    const styleProps = {contentWidth,titlePadding};
    const mode = isQuestionVisible ? 'question' : (isRoutesVisible ? 'routes' : (isFluxStoresVisible ? 'flux' : null));
    return  (
      <div style={{paddingTop: this.props.paddingTop}}>
        <SwitchActivator
          title={'Focus Dev tools'}
          mode={mode}
          onFluxStoreClick={() => dispatch(setFluxStoreMode())}
          onRoutesClick={() => dispatch(setRouteMode())}
        />
        <DevTool
          grade={this.state.grade}
          mode={mode}
          onSendGrade={()=> this.onSend()}
          onSetGrade={value =>this.setGrade(value)}
          routes={routes}
          stores={stores}
          styleProps={styleProps}
        />
        {isDebugDevTools && <Code {...codeProps} /> }
        {
          isQuestionVisible &&
            null/*<Average lastVote={this.props.storeData.pushQuestion.lastDate || new Date().toISOString()} grades={this.props.storeData.pushQuestion.projectAnswers || []}/>*/
        }
      </div>
    )
  }
}
FocusDevTools.defaultProps = {
  isQuestionVisible: false,
  isRoutesVisible: true,
  isFluxStoresVisible: false,
  isSwitchMode: true
};

FocusDevTools.propTypes = {
  grade: PropTypes.number,
  sendGrade: PropTypes.func.isRequired,
  isQuestionVisible: PropTypes.bool.isRequired,
  isRoutesVisible: PropTypes.bool.isRequired,
  isFluxStoresVisible: PropTypes.bool.isRequired,
  isSwitchMode: PropTypes.bool.isRequired
};
FocusDevTools.displayName = 'FocusDevTools';


const StateConnectedFocusDevTools = connectToReduxStore(
  (data) => ({storeData: data, isQuestionVisible: data.pushQuestion.isQuestionVisible, isRoutesVisible: data.settings.isRoutesVisible, isFluxStoresVisible: data.settings.isFluxStoresVisible})
)(FocusDevTools);

export default StateConnectedFocusDevTools;
