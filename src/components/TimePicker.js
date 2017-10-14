import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';

// import the component
import {TextInputMask} from 'react-native-masked-text';

export class TimePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {time: ''}
    this.onTimeChange = this.props.onTimeChange.bind(this)
  }

  isValid() {
    // isValid method returns if the inputed value is valid.
    // Ex: if you input 40/02/1990 30:20:20, it will return false
    //     because in this case, the day and the hour is invalid.
    let valid = this.refs[this.props.id].isValid();

    // get converted value. Using type=datetime, it returns the moment object.
    // If it's using type=money, it returns a Number object.
    let rawValue = this.refs[this.props.id].getRawValue();
  }

  onChangeText(time) {
    this.setState({time: time})
    this.onTimeChange(time)
  }

  render() {
    // the type is required but options is required only for some specific types.
    return (
      <TextInputMask
        ref={this.props.id}
        type={'datetime'}
        style={{height: 40, width: 100}}
        onChangeText={(time) => this.onChangeText(time)}
        value={this.state.time}
        // onChangeText={(time) => this.onTimeChange({time})}
        // onChangeText={(time) => {this.setState({time: time})}}
        options={{
          format: 'HH:mm'
        }} />
    );
  }
}