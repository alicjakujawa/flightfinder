import React, { Component, PropTypes } from 'react';
import './style.sass';

class ErrorMessage extends Component {

  render() {
    return (
      <div className="error">{this.props.message}</div>
    );
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
