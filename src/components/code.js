import PropTypes from 'prop-types';
import React from 'react';

function Code(props) {
    return (
        <pre>
            <h4>Your props</h4>
            <code>
                {JSON.stringify(props, null, 2)}
            </code>
        </pre>
    );
}


Code.displayName = 'Code';
export default Code;
