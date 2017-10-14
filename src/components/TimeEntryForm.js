import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import {TimePicker as TimePicker} from './TimePicker'
import TimeEntry from './../models/time_entry'
// import Moment from 'react-moment'
import moment from 'moment'
import Realm from 'realm'

// export default new Realm({ schema: [TimeEntry] });
// const realm = new Realm({schema: [TimeEntry]})

export class TimeEntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = { timeStart: '', timeEnd: '', timeEntryId: '0', realm: null }
  }

  componentDidMount() {
    this.initDB()
  }

  initDB(){
     Realm.open({ // open connection
       schema: [TimeEntry]
     }).then(realm => { // here is realm
      this.setState({ realm: realm });  // set it to state
    })
  }

  nextId(){
    let entries = this.state.realm.objects('TimeEntry').sorted('id', true)
    return (entries.length > 0 ? entries[0].id + 1 : 1)
  }

  saveSleepRecord(){
    let today = moment().format('YYYYMMDD')

    let asleep = today+' '+this.state.timeStart
    let wokeUp = today+' '+this.state.timeEnd

    asleep = moment(asleep, "YYYYMMDD HH:mm").unix()
    wokeUp = moment(wokeUp, "YYYYMMDD HH:mm").unix()

    // let random = Math.floor(Math.random() * (1000 - 1)) + 1

    let realm = this.state.realm
    // Realm.open({schema: [TimeEntry]}).then(realm => {
      realm.write(() => {
       const time_entry = realm.create(TimeEntry, { id: this.nextId(), timeStart: asleep, timeEnd: wokeUp })
       this.setState({timeEntryId: time_entry.id.toString()})
      })
    // })
  }

  // for today - currently
  // probably need to move to App
  // findSleepEntry(){
  //   let sleepEntry = realm.objects('TimeEntry').filtered('timeEnd > ?', moment().startOf('day'));
  // }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{width: 100}} value={this.state.timeEntryId} editable={false}/>
        <TimePicker id="timeAsleep" time={this.state.timeAsleep}
          onTimeChange={(time) => this.setState({timeAsleep: time})}
        />
        <TimePicker id="timeWokeUp" time={this.state.timeWokeUp}
          onTimeChange={(time) => this.setState({timeWokeUp: time})}
        />
        <Button title='save' color="#6698FF"
          ref={component => this._button = component}
          onPress={this.saveSleepRecord.bind(this)}>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
