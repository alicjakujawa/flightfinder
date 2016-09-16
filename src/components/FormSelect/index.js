import React, { Component, PropTypes } from 'react';
import './style.sass';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class FormSelect extends Component {

  render() {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          componentClass="select"
          value={this.props.value}
          onChange={this.props.handleChange}
          name={this.props.name}
        >
          <option value="">{this.props.placeholder}</option>
          {this.props.options ? this.props.options.map((option, i) =>
            <option key={i} value={option.iataCode}>{option.name}</option>
            ) : null}
        </FormControl>
      </FormGroup>
    );
  }
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormSelect;
