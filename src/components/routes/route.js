import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon';
const RouteDX = ({ name, onClick, className, iconName }) => {
    return (
        <li className={className} onClick={() => onClick(name)}>
            <span className='mdl-list__item-primary-content'>
                {name}
            </span>
            <span className='mdl-list__item-secondary-content'>
                <a className='mdl-list__item-secondary-action' onClick={e => { e.preventDefault(); onClick(name); }}><Icon>{iconName}</Icon></a>
            </span>
        </li>
    )
}

RouteDX.displayName = 'RouteDx';
RouteDX.defaultProps = {
    className: 'mdl-list__item',
    iconName: 'touch_app'
}
RouteDX.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    iconName: PropTypes.string
}

export default RouteDX;
