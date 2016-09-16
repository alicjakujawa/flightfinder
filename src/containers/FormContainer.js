import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';

import * as actionCreators from '../actions/FlightActions';
import FormSelect from '../components/FormSelect';
import ErrorMessage from '../components/ErrorMessage';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import DatePicker from 'react-bootstrap-date-picker';
import Button from 'react-bootstrap/lib/Button';


class FormContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      startDate: '',
      endDate: '',
      errors: [],
      showErrors: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.search = this.search.bind(this);
    this.validate = this.validate.bind(this);
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

    if (this.validate(flight)) {
      this.props.actions.searchFlight(flight);
      this.clearForm();
    } else {
      this.setState({ showErrors: true });
    }
  }

  clearForm() {
    this.setState({
      origin: '',
      destination: '',
      startDate: '',
      endDate: '',
      showErrors: false,
      error: '',
    });
  }

  validate(flight) {
    this.setState({ errors: [] });

    const notEmptyValues = _.every(flight, (prop) => {
      return prop !== '' && prop !== 'Invalid date';
    });

    if (!notEmptyValues) {
      this.setState({ error: 'Fill all the fields' });
      return false;
    }

    const invalidDateRange = flight.endDate < flight.startDate;

    if (invalidDateRange) {
      this.setState({ error: 'Departure date must be before fly back date' });
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.showErrors ?
          <ErrorMessage message={this.state.error} />
        : null}
        <form onSubmit={this.search}>
          <FormSelect
            label="Select origin"
            value={this.state.origin}
            name="origin"
            handleChange={this.handleChange}
            placeholder="Select origin..."
            options={this.props.airports}
          />
          <FormSelect
            label="Select destination"
            value={this.state.destination}
            name="destination"
            handleChange={this.handleChange}
            placeholder="Select destination..."
            options={this.props.airports}
          />
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
