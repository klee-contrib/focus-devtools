import { isObject, isArray, isFunction } from 'lodash';

const STORE_LOGGER = 'DX_STORE_LOGGER';
const CONSOLE_STYLE = 'color: blue;';

// Creates a logger which listen to all the dispatched information, and uses a store list
// The dispatcher should be a flux/dispatcher
// The getStores function should list the stores to track
const createStoreLogger = (dispatcher, getStores) => {
    if (!isObject(dispatcher) || !isFunction(dispatcher.register)) {
        throw new Error(`${STORE_LOGGER} : you should provide a dispatcher`)
    }
    if (!isFunction(getStores)) {
        throw new Error(`${STORE_LOGGER} : you should provide a getStores function such as () => CoreStore.prototype._instances`)
    }

    dispatcher.register(transferInfo => {
        const stores = getStores();
        if (!isArray(stores)) {
            throw new Error(`${STORE_LOGGER} : you should provide a list of stores to read see focus-core/store/CoreStore.prototype._instances.`)
        }
        const { type, data } = transferInfo.action;
        console.groupCollapsed(`%c ${STORE_LOGGER} : action ${type} ${Object.keys(data).join('')}`, CONSOLE_STYLE);
        console.log('action dispatcher source', `${transferInfo.source} ${type} ${Object.keys(data).join('')} `, data)
        console.groupCollapsed(`${STORE_LOGGER} stores values`);
        Object.keys(stores).reduce((res, current) => {
            const currentStore = stores[current];
            const { name } = currentStore.constructor;
            if (!isFunction(currentStore.getValue)) {
                console.warn(`${STORE_LOGGER} :  The store ${name} shoud have a getValue method to be logged`);
                return;
            }
            console.log(name, currentStore.getValue());
        }, {});
        console.groupEnd();
        console.groupEnd();
    });
};

export default createStoreLogger;
