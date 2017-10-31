import React, { PropTypes } from 'react';

//Component
const DevPanel = ({ children, project, user }) => <div data-project={project} data-user={user}>{children}</div>;

DevPanel.displayName = 'DevPanel';

DevPanel.propTypes = {
    project: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}
export default DevPanel;
