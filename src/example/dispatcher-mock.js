const callbacks = [];

const Dispatcher = {
    dispatch(message) {
        return Promise.all(
            callbacks.map(callback => {
                return callback(message);
            })
        );
    },
    register(cb){
      callbacks.push(cb);
    }
};

export default Dispatcher;
