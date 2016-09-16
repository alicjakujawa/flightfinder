import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Result from '../components/Result';

class ResultContainer extends Component {
  render() {
    const { results } = this.props;
    return (
      <div className="wrapper">
        {results ?
          <Result results={results} />
        : null}
      </div>
    );
  }
}

ResultContainer.propTypes = {
  results: PropTypes.object,
};

const mapStateToProps = (state) => ({
  results: state.flights.results,
});

export default connect(mapStateToProps)(ResultContainer);
