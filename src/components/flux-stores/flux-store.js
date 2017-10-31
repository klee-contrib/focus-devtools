import React, { PropTypes, Component } from 'react';
import Icon from '../icon';
import JSONTree from 'react-json-tree';

class FluxStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValueVisible: props.isValueVisible
        }
        this.toggleShowStoreValue.bind(this);
    }
    toggleShowStoreValue() {
        this.setState({ isValueVisible: !this.state.isValueVisible });
    }
    render() {
        const { isValueVisible } = this.state;
        const { name, getValue } = this.props;
        const iconName = isValueVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
        return (
            <div>
                <li className='mdl-list__item' onClick={() => this.toggleShowStoreValue()}>
                    <span className='mdl-list__item-primary-content'>
                        {name}
                    </span>
                    <span className='mdl-list__item-secondary-content'>
                        <a className='mdl-list__item-secondary-action' onClick={e => { e.preventDefault(); this.toggleShowStoreValue(); }}><Icon>{iconName}</Icon></a>
                    </span>
                </li>
                {
                    isValueVisible &&
                    <li className='mdl-list__item' >
                        <span className='mdl-list__item-primary-content'>
                            <JSONTree data={getValue()} invertTheme={false} />
                        </span>
                    </li>
                }
            </div>
        );
    }
}

FluxStore.propTypes = {
    getValue: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    isValueVisible: PropTypes.bool
}

FluxStore.defaultProps = {
    isValueVisible: false
}
FluxStore.displayName = 'FluxStore';

export default FluxStore;
