// react and redux utils
import React, {Component, PropTypes} from 'react';
import {connect as connectToReduxStore } from 'react-redux';

// get internal components
import Code from './code'
import Average from './push-question/average';
import Grade from './push-question/grade'
import Routes from './routes';
import FluxStores from './flux-stores';

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
    const {isQuestionVisible, isRoutesVisible, isFluxStoresVisible, contentWidth, titlePadding, isDebugDevTools} = this.props;
    const codeProps = {state: this.state, props: this.props}
    return  (
      <div>
        <h2> Focus Dev tools</h2>
        {
          isQuestionVisible ?
            <Grade contentWidth={contentWidth} value={this.state.grade} maxGrade={5} onChange={value => this.setGrade(value)} onClick={value => this.setGrade(value)} onSend={() => this.onSend()} />
          :
            <Average lastVote={this.props.storeData.pushQuestion.lastDate || new Date().toISOString()} grades={this.props.storeData.pushQuestion.projectAnswers || []}/>
        }
        {
          isFluxStoresVisible &&
          <FluxStores contentWidth={contentWidth} titlePadding={titlePadding} stores={this.props.stores}/>
        }
        {
          isRoutesVisible &&
            <Routes contentWidth={contentWidth} titlePadding={titlePadding} data={this.props.routes}/>
        }
        {isDebugDevTools && <Code {...codeProps} /> }
      </div>
    )
  }
}
FocusDevTools.defaultProps = {
  isQuestionVisible: false,
  isRoutesVisible: true,
  isFluxStoresVisible: true
};

FocusDevTools.propTypes = {
  grade: PropTypes.number,
  sendGrade: PropTypes.func.isRequired,
  isQuestionVisible: PropTypes.bool.isRequired,
  isRoutesVisible: PropTypes.bool.isRequired,
  isFluxStoresVisible: PropTypes.bool.isRequired
};
FocusDevTools.displayName = 'FocusDevTools';


const StateConnectedFocusDevTools = connectToReduxStore(
  (data) => ({storeData: data, isQuestionVisible: data.pushQuestion.isQuestionVisible})
)(FocusDevTools);

export default StateConnectedFocusDevTools;
