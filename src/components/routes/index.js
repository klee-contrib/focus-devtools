import React, {PropTypes} from 'react';
import RouteDX from './route';
import JSONTree from 'react-json-tree';


const _defaultProcessRoute = r =>  ({name: r.route.toString().split('(')[0].split('/^')[1], callback: r.callback});

const RoutesDX = ({className, data, process, title}) => {
  return (
    <div data-focus='routes-dx' style={{width: '300px'}}>
      <h3>{title}</h3>
      <ul className={className} data-focus='routes' >
        {
          data.
            map(process).
            map(({name, callback: onRouteClick}) => <RouteDX key={name} name={name} onClick={onRouteClick} />)
        }
      </ul>
    </div>
  );
};



RoutesDX.displayName = 'RoutesDX';

const routeLogger = d => console.log('route' , d)

RoutesDX.defaultProps = {
  data: [{
    route: /^help(?:\?([\s\S]*))?$/,
    callback: routeLogger
  },
  {
    route: /^holp(?:\?([\s\S]*))?$/,
    callback: routeLogger
  },
  {
    route: /^azjbnfhzbfhebhf(?:\?([\s\S]*))?$/,
    callback: routeLogger
  }],
  process: _defaultProcessRoute,
  className: 'mdl-list',
  title: 'La liste des routes'
}
RoutesDX.propTypes = {
  data: PropTypes.array.isRequired,
  process: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}

export default RoutesDX;
