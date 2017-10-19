import React, { PropTypes } from 'react';
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

const SwitchActivator = ({ title, mode, iconName, onFluxStoreClick, onRoutesClick }) => {
    const text = mode === 'question' ? 'vous et focus?' : mode;
    return (
        <div style={switchStyle}>
            <h4 style={{ margin: 10 }}>{title}</h4>
            <h4 style={{ margin: 10, color: COLOR, background: 'white', padding: '0 10px 0 10px' }}>{text}</h4>
            <button id='dx-switch-activator' className='mdl-button mdl-button--icon'>
                <Icon>{iconName}</Icon>
            </button>
            <Switcher targetId={'dx-switch-activator'} onFluxStoreClick={onFluxStoreClick} onRoutesClick={onRoutesClick} />
        </div>
    );
}

SwitchActivator.displayName = 'SwitchActivator';
SwitchActivator.defaultProps = {
    iconName: 'more_vert'
}

export default SwitchActivator;
