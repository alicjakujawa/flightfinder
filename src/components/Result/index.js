import React, { Component, PropTypes } from 'react';
import './style.sass';
import moment from 'moment';
import _ from 'lodash';

class Result extends Component {

  render() {
    const result = this.props.results;
    return (
      <div className="result">
        <h3 className="result__header">Cheapest flight</h3>
        <p className="result__item">
          <span className="result-item__label">Departure:</span>
          {moment(result.dateFrom).format('MMMM Do YYYY, h:mm')}
        </p>
        <p>
          <span className="result-item__label">Fly back:</span>
          {moment(result.dateTo).format('MMMM Do YYYY, h:mm')}
        </p>
        <p>
          <span className="result-item__label">Price:</span>
          {_.round(result.price, 2)} {result.currency}
        </p>
      </div>
    );
  }
}

Result.propTypes = {
  results: PropTypes.object.isRequired,
};

export default Result;
