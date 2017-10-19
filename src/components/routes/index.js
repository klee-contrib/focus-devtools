import React, { PropTypes } from 'react';
import RouteDX from './route';
import JSONTree from 'react-json-tree';


const _defaultProcessRoute = r => ({ name: r.route.toString().split('(')[0].split('/^')[1], callback: r.callback });

const RoutesDX = ({ className, data, process, title, contentWidth, titlePadding }) => {
    return (
        <div data-focus='routes-dx' style={{ width: contentWidth }}>
            {/*<h3 style={{padding: titlePadding}}>{title}</h3>*/}
            <ul className={className} data-focus='routes' >
                {data ?
                    data.
                        map(process).
                        map(({ name, callback: onRouteClick }) => <RouteDX key={name} name={name} onClick={onRouteClick} />)
                    :
                    <li className='mdl-list__item'>No routes</li>
                }
            </ul>
        </div>
    );
};

RoutesDX.displayName = 'RoutesDX';
RoutesDX.defaultProps = {
    process: _defaultProcessRoute,
    className: 'mdl-list',
    title: 'Routes'
}
RoutesDX.propTypes = {
    data: PropTypes.array.isRequired,
    process: PropTypes.func.isRequired,
    className: PropTypes.string,
    title: PropTypes.string
}

export default RoutesDX;
