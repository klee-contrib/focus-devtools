import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, type, onClick, isColored }) => {
    return (
        <button onClick={onClick} className={`mdl-button mdl-button--${type} ${isColored ? 'mdl-button--colored' : ''}`}>
            {children}
        </button>
    );
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

export default Button;
