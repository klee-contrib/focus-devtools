import React, {Component, PropTypes} from 'react';
class Question extends Component {
  constructor(props){
    super(props);
    this.state = {grade: this.props.grade};
    this.setGrade.bind(this);
    this.setAnswer.bind(this);
  }
  setGrade(value){
      this.setState({grade: value});
  }
  setAnswer(value){
    console.log('answser', value);
  }
  onSend(){
    this.props.sendGrade(this.state.grade);
  }
  render(){
    return  <Grade value={this.state.grade} maxGrade={10} onChange={value => this.setGrade(value)} onClick={value => this.setGrade(value)} onSend={() => this.onSend()}/>
  }
}


Question.propTypes = {
  grade: PropTypes.number,
  sendGrade: PropTypes.func.isRequired
}

function Icon({children}){
  return  <i className='material-icons'>{children}</i>;
}

function Grade({value, maxGrade, onChange, onClick, onSend}){
  return (
    <div data-focus='question' style={{display: 'flex'}}>
      {
        Array.from(Array(maxGrade).keys()).map(
          gd => <div key={gd} onClick={() => onClick(gd)} onMouseHover={() => onChange(gd)}><Icon>{gd <= value ? 'favorite' : 'favorite_border'}</Icon></div>
        )
      }
      <ButtonFab onClick={()=>{onSend()}}><Icon>send</Icon></ButtonFab>

    </div>);
}

function ButtonFab({children, onClick}){
  return (
    <button onClick={onClick} className="mdl-button mdl-button--fab mdl-button--colored">
      {children}
    </button>
  )
}
ButtonFab.displayName = 'ButtonFab';
ButtonFab.propTypes = {
  onClick: PropTypes.func.isRequired
}


Grade.displayName = 'Grade';

Grade.defaultProps = {
  maxGrade: 10,
  value: 0
}

Grade.propTypes = {
  maxGrade: PropTypes.number,
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}
export default Question;
