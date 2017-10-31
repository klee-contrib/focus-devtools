import React, { cloneElement, Children, Component, PropTypes } from 'react';
import { connect as connectToReduxStore } from 'react-redux';
import { toggleVisibility } from '../actions/dev-tools-settings-actions';
import Dock from 'react-dock';
import parseKey from 'parse-key';

class FocusDevDock extends Component {
    static propTypes = {
        defaultIsVisible: PropTypes.bool.isRequired,
        defaultSize: PropTypes.number.isRequired,
        toggleVisibilityKey: PropTypes.string.isRequired,
        fluid: PropTypes.bool
    };

    static defaultProps = {
        defaultIsVisible: true,
        defaultPosition: 'right',
        defaultSize: 0.3,
        fluid: true
    };

    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);

    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    matchesKey(key, event) {
        if (!key) {
            return false;
        }

        const charCode = event.keyCode || event.which;
        const char = String.fromCharCode(charCode);
        return key.name.toUpperCase() === char.toUpperCase() &&
            key.alt === event.altKey &&
            key.ctrl === event.ctrlKey &&
            key.meta === event.metaKey &&
            key.shift === event.shiftKey;
    }

    handleKeyDown(e) {
        // Ignore regular keys when focused on a field
        // and no modifiers are active.
        if ((
            !e.ctrlKey && !e.metaKey && !e.altKey
        ) && (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'SELECT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.isContentEditable
            )) {
            return;
        }

        const visibilityKey = parseKey(this.props.toggleVisibilityKey);


        if (this.matchesKey(visibilityKey, e)) {
            e.preventDefault();
            this.toggleVisibility();
        }
    }

    toggleVisibility() {
        this.props.dispatch(toggleVisibility());
    }
    render() {
        const { children, fluid, isVisible, ...rest } = this.props;
        return (
            <Dock position={'right'}
                isVisible={isVisible}
                fluid={fluid}
                dimMode='none'
            >
                {children}
            </Dock>
        );
    }
}

const StateConnectedFocusDevDock = connectToReduxStore(
    data => ({ isVisible: data.settings.isVisible })
)(FocusDevDock);


export default StateConnectedFocusDevDock;
