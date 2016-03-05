import React, {PropTypes} from 'react';
import Button from '../button';
import Icon from '../icon';

const Grade = ({value, maxGrade, onChange, onClick, onSend, iconName}) => {
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

export default Grade;
