import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions/FlightActions';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import DatePicker from 'react-bootstrap-date-picker';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';

class FormContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      startDate: '',
      endDate: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.props.actions.getCodes();
  }

  handleChange(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleStartDate(value) {
    this.setState({ startDate: value });
  }

  handleEndDate(value) {
    this.setState({ endDate: value });
  }

  search(e) {
    e.preventDefault();
    const flight = {
      origin: this.state.origin,
      destination: this.state.destination,
      startDate: moment(this.state.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.state.endDate).format('YYYY-MM-DD'),
    };

    this.props.actions.searchFlight(flight);
    this.clearForm();
  }

  clearForm() {
    this.setState({ origin: '', destination: '', startDate: '', endDate: '' });
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.search}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select origin</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.origin}
              onChange={this.handleChange}
              name="origin"
            >
              <option value="">Select origin...</option>
              {this.props.airports ? this.props.airports.map((airport, i) =>
                <option key={i} value={airport.iataCode}>{airport.name}</option>
                ) : null}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select destination</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.destination}
              onChange={this.handleChange}
              name="destination"
            >
              <option value="">Select destination...</option>
              {this.props.airports ? this.props.airports.map((airport, i) =>
                <option key={i} value={airport.iataCode}>{airport.name}</option>
                ) : null}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Departure date</ControlLabel>
            <DatePicker
              onChange={this.handleStartDate}
              placeholder="Choose date"
              value={this.state.startDate}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Fly back</ControlLabel>
            <DatePicker
              onChange={this.handleEndDate}
              placeholder="Choose date"
              value={this.state.endDate}
            />
          </FormGroup>
          <Button type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

FormContainer.propTypes = {
  airports: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  airports: state.flights.airports,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
