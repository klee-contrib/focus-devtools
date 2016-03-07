import React, {PropTypes} from 'react';
import FluxStore from './flux-store';

const FluxStoresList = ({stores, title, contentWidth}) => {
  const storeList = Object.keys(stores).reduce((res, current) => {
    const name = stores[current].name || stores[current].constructor.name;
    const getValue =  stores[current].getValue
    res.push({name, getValue});
     return res;
  }, []);
  return (
    <div style={{width: contentWidth}}>
      <h3>{title}</h3>
      <ul className='mdl-list'>
        {storeList.map(store => <FluxStore key={store.name} {...store} />)}
      </ul>
    </div>
  );
};



FluxStoresList.displayName = 'FluxStoresList';
FluxStoresList.propTypes = {
  title: PropTypes.string.isRequired,
  stores: PropTypes.object.isRequired
};
FluxStoresList.defaultProps ={
  title: 'Liste des stores',
  stores: {
    'person': {
      name: 'person',
      getValue: () => ({name: 'Pierre', age: 28})
    },
    'search': {
      name: 'search',
      getValue: () => ({name: 'Don diego', test: [{name: 1}, {name: 1},{name: 1},{name: 3}]})
    }
  }
}

export default FluxStoresList;
