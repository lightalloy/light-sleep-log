import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// import {TimePicker as TimePicker} from './src/components/TimePicker';
import {TimeEntryForm as TimeEntryForm} from './src/components/TimeEntryForm';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, world!</Text>
        <TimeEntryForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
