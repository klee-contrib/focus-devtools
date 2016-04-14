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
        <h4>Pouvez vous noter votre expérience avec Focus sur 5 en cliquant sur l'étoile correspondante.</h4>
        <p>Merci pour votre aide!</p>
        <h5>Pourquoi est ce que nous vous demandons cette information?</h5>
        <p>Une fois par semaine nous allons pousser cette question dans les devtools afin de pouvoir avoir du feedback continue de la part des projets.</p>
        <p>Ce feedback est extrèmement important pour nous afin de pouvoir agir pour améliorer votre expérience avec les outils focus.</p>
      </div>
    </div>
  );
}
Grade.displayName = 'Grade';

Grade.defaultProps = {
  maxGrade: 5,
  iconName: 'star',
  value: 3,
  title: 'Notez Focus'
}

Grade.propTypes = {
  maxGrade: PropTypes.number,
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Grade;
