import React, { PropTypes } from 'react';
import Button from '../button';
import Icon from '../icon';

const Switcher = ({ onFluxStoreClick, onRoutesClick, targetId }) => {
    return (
        <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu' htmlFor={targetId}>
            <Switch onClick={onFluxStoreClick} name='Flux stores mode' text='Selct flux stores mode' />
            <Switch onClick={onRoutesClick} name='Routes mode' text='Selct routes mode' />
        </ul>
    );
}


const Switch = ({ name, onClick }) => <li className='mdl-menu__item' onClick={() => onClick()}>{name}</li>

Switcher.displayName = 'Switcher';

export default Switcher;
