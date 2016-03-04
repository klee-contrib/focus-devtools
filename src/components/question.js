import React, {Component, PropTypes} from 'react';
import {connect as connectToReduxStore } from 'react-redux';
import Code from './code'
class Question extends Component {
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
    const {isQuestionVisible} = this.props;
    const codeProps = {state: this.state, props: this.props}
    return  (
      <div>
        {
          isQuestionVisible ?
            <Grade value={this.state.grade} maxGrade={5} onChange={value => this.setGrade(value)} onClick={value => this.setGrade(value)} onSend={() => this.onSend()} />
          :
            <Average lastVote={this.props.storeData.pushQuestion.lastDate || new Date().toISOString()} grades={this.props.storeData.pushQuestion.projectAnswers || []}/>
        }
        <Code {...codeProps} />
      </div>
    )
  }
}


Question.propTypes = {
  grade: PropTypes.number,
  sendGrade: PropTypes.func.isRequired
}


function prettyDate(time){
  var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;

	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}


function Average({grades, lastVote}){
  const NB_GRADES = grades.length;
console.log('Grades', grades);
  const average = NB_GRADES > 0 ? (grades.reduce((res, current) => res + current.grade, 0)/ NB_GRADES).toFixed(2) : '-';
  return (
    <div>
      <pre>Note moyenne de votre projet sur {NB_GRADES} notes: </pre>
      <Button onClick={() =>alert(`La note moyenne est ${average}`)}>
        {average}
      </Button>
      <pre> Dernier vote {prettyDate(lastVote)}</pre>
    </div>
  );
}
Average.displayName = 'Average';
Average.propTypes = {
  grades: PropTypes.array.isRequired,
  lastVote: PropTypes.string
}

function Icon({children}){
  return  <i className='material-icons'>{children}</i>;
}

function Grade({value, maxGrade, onChange, onClick, onSend, iconName}){
  return (
    <div data-focus='question' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', width: '40%', maxWidth: '500px'}}>
        {
          Array.from(Array(maxGrade).keys()).map(
            gd => <Button key={gd} onClick={() => onClick(gd)}><Icon>{gd <= value ? iconName : `${iconName}_border`}</Icon></Button>
          )
        }
      </div>
      <Button style={{width: '20%'}} isColored={true} type='raised' onClick={()=>{onSend()}}><Icon>send</Icon></Button>
    </div>
  );
}
Grade.displayName = 'Grade';

Grade.defaultProps = {
  maxGrade: 5,
  iconName: 'star',
  value: 0
}

Grade.propTypes = {
  maxGrade: PropTypes.number,
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

function Button({children, type, onClick, isColored}){
  return (
    <button onClick={onClick} className={`mdl-button mdl-button--${type} ${isColored ? 'mdl-button--colored' : ''}`}>
      {children}
    </button>
  )
}
Button.displayName = 'Button';
Button.defaultProps = {
  isColored: false,
  type: 'fab'
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  type: PropTypes.string,
  isColored: PropTypes.bool
}
const StateConnectedQuestion = connectToReduxStore(
  (data) => ({storeData: data, isQuestionVisible: data.pushQuestion.isQuestionVisible})
)(Question);

export default StateConnectedQuestion;
