import React, {PropTypes} from 'react';
import Button from '../button';
import Icon from '../icon';

const Grade = ({value, maxGrade, onChange, onClick, onSend, iconName, contentWidth, titlePadding, title}) => {
  return (
    <div>
      <div data-focus='question' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: contentWidth, marginTop: '40px'}}>
        <div style={{display: 'flex', width: '80%'}}>
          {
            Array.from(Array(maxGrade).keys()).map(
              gd => <Button key={gd} onClick={() => onClick(gd)}><Icon>{gd <= value ? iconName : `${iconName}_border`}</Icon></Button>
            )
          }
        </div>
        <Button style={{width: '20%'}} isColored={true} type='raised' onClick={()=>{onSend()}}><Icon>send</Icon></Button>
      </div>
      <div style={{width: '100%', alignItems: 'center', textAlign: 'center'}}>
        <pre>{
          `Click on a star to rate your experience with focus over 5...
Thanks for your feedback!`
        }</pre>
      </div>
    </div>
  );
}
Grade.displayName = 'Grade';

Grade.defaultProps = {
  maxGrade: 5,
  iconName: 'star',
  value: 0,
  title: 'Notez Focus'
}

Grade.propTypes = {
  maxGrade: PropTypes.number,
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Grade;
