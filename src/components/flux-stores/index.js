import PropTypes from 'prop-types';
import React from 'react';
import FluxStore from './flux-store';

const FluxStoresList = ({ stores, title, contentWidth, titlePadding }) => {
    const storeList = stores ? Object.keys(stores).reduce((res, current) => {
        const name = stores[current].name || stores[current].constructor.name;
        const getValue = stores[current].getValue
        res.push({ name, getValue });
        return res;
    }, []) : [];
    return (
        <div style={{ width: contentWidth }}>
            {/*<h3 style={{padding: titlePadding}}>{title}</h3>*/}
            <ul className='mdl-list'>
                {
                    storeList.length > 0
                        ?
                        storeList.map(store => <FluxStore key={store.name} {...store} />)
                        :
                        <li className='mdl-list__item'>No stores</li>
                }
            </ul>
        </div>
    );
};


FluxStoresList.displayName = 'FluxStoresList';
FluxStoresList.propTypes = {
    title: PropTypes.string.isRequired,
    stores: PropTypes.object.isRequired
};
FluxStoresList.defaultProps = {
    title: 'Stores'
}

export default FluxStoresList;
