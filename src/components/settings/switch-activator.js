import React, {PropTypes} from 'react';
import Button from '../button';
import Icon from '../icon';
import Switcher from './switcher';
const COLOR = '#3F51B5';
const switchStyle = {
  boxSizing: 'border-box',
  background: COLOR,
  color: 'white',
  width: '100%',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const SwitchActivator = ({title,mode, iconName}) => {
  return (
    <div style={switchStyle}>
      <h4 style={{margin: 0}}>{title}</h4>
      <h4 style={{margin: 0, color: COLOR, background: 'white', padding: '0 10px 0 10px'}}>{mode}</h4>
      <button id='dx-switch-activator' className="mdl-button mdl-button--icon">
        <Icon>{iconName}</Icon>
      </button>
      <Switcher targetId={'dx-switch-activator'}  onFluxStoreClick={() => console.log('flux store mode')} onRoutesClick={() => console.log('routes mode')} />
    </div>
  );
  return <Button onClick={()=> onClick()}><Icon>{'developer_board'}</Icon></Button>;
}

SwitchActivator.displayName = 'SwitchActivator';
SwitchActivator.defaultProps = {
    iconName: 'more_vert'
}

export default SwitchActivator;
