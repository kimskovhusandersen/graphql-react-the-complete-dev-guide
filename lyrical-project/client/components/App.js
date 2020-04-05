import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => <div className="container">{children}</div>;

App.defaultProps = {
  children: PropTypes.node,
};
App.propTypes = {
  children: PropTypes.node,
};
export default App;
