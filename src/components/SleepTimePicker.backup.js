import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  PanResponder
} from 'react-native';
import DatePicker from 'react-native-datepicker'

export class SleepTimePicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '20:00' // ,
      // datetime: '2016-05-05 20:00',
      // datetime1: '2016-05-05 20:00'
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        onChangeText={(time) => this.setState({time})}
        value={this.state.time} />

        <DatePicker
          is24Hour={true}
          androidMode="spinner"
          style={{width: 200}}
          date={this.state.time}
          mode="time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={10}
          onDateChange={(time) => {this.setState({time: time});}}
        />
        <Text style={styles.instructions}>time: {this.state.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
