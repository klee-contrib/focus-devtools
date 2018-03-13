// react and redux utils
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect as connectToReduxStore } from 'react-redux';
import SwitchActivator from './settings/switch-activator';
// get internal components
import Code from './code'
import Routes from './routes';
import FluxStores from './flux-stores';
import { setRouteMode, setFluxStoreMode } from '../actions/dev-tools-settings-actions';

const _processStores = stores => stores.reduce((res, current) => {
    const name = current.name || current.constructor.name;
    res[name] = { name, getValue: () => current.getValue() };
    return res;
}, {});

const DevTool = ({ grade, onSetGrade, onSendGrade, styleProps, mode, getStores, routes, processStores }) => {
    switch (mode) {
        case 'flux':
            return <FluxStores stores={processStores(getStores())} {...styleProps} />;
        case 'routes':
            return <Routes data={routes} {...styleProps} />;
        default:
            return <div>Empty</div>;
    }
};
DevTool.displayName = 'DevTool';
DevTool.PropTypes = {
    grade: PropTypes.number,
    onSetGrade: PropTypes.func.isRequired,
    onSendGrade: PropTypes.func.isRequired,
    styleProps: PropTypes.object,
    mode: PropTypes.string.isRequired,
    getStores: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    processStores: PropTypes.func.isRequired
}
DevTool.defaultProps = {
    processStores: _processStores
}


class FocusDevTools extends Component {
    constructor(props) {
        super(props);
        this.state = { grade: this.props.grade };
        this.setGrade.bind(this);
        this.setAnswer.bind(this);
    }
    // componentWillMount() {
    //     this.props.dispatch(this.props.initQuestion())
    // }
    setGrade(value) {
        this.setState({ grade: value });
    }
    setAnswer(value) {
        //console.log('answser', value);
    }
    // onSend() {
    //     //console.log('onSend', this.state.grade);
    //     this.props.dispatch(this.props.sendGrade(this.state.grade));
    // }

    render() {
        const { dispatch, isQuestionVisible, isRoutesVisible, isFluxStoresVisible, contentWidth, titlePadding, isDebugDevTools, isSwitchMode, getStores, routes } = this.props;
        const codeProps = { state: this.state, props: this.props };
        const styleProps = { contentWidth, titlePadding };
        const mode = (isRoutesVisible ? 'routes' : (isFluxStoresVisible ? 'flux' : null));
        return (
            <div style={{ paddingTop: this.props.paddingTop }}>
                <SwitchActivator
                    title={'Focus Dev tools'}
                    mode={mode}
                    onFluxStoreClick={() => dispatch(setFluxStoreMode())}
                    onRoutesClick={() => dispatch(setRouteMode())}
                />
                <DevTool
                    grade={this.state.grade}
                    mode={mode}
                    onSendGrade={() => this.onSend()}
                    onSetGrade={value => this.setGrade(value)}
                    routes={routes}
                    getStores={getStores}
                    styleProps={styleProps}
                />
                {isDebugDevTools && <Code {...codeProps} />}
            </div>
        )
    }
}
FocusDevTools.defaultProps = {
    grade: 3,
    isQuestionVisible: false,
    isRoutesVisible: true,
    isFluxStoresVisible: false,
    isSwitchMode: true
};

FocusDevTools.propTypes = {
    grade: PropTypes.number,
    sendGrade: PropTypes.func.isRequired,
    isQuestionVisible: PropTypes.bool.isRequired,
    isRoutesVisible: PropTypes.bool.isRequired,
    isFluxStoresVisible: PropTypes.bool.isRequired,
    isSwitchMode: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    getStores: PropTypes.func.isRequired
};
FocusDevTools.displayName = 'FocusDevTools';


const StateConnectedFocusDevTools = connectToReduxStore(
    (data) => ({ storeData: data, isRoutesVisible: data.settings.isRoutesVisible, isFluxStoresVisible: data.settings.isFluxStoresVisible })
)(FocusDevTools);

export default StateConnectedFocusDevTools;
