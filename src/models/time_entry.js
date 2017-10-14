import Realm from 'realm';
export default class TimeEntry extends Realm.Object { }

// class TimeEntry {}
TimeEntry.schema = {
  name: 'TimeEntry',
  primaryKey: 'id',
  properties: {
    id: 'int',
    timeStart:  'int',
    timeEnd: 'int',
  }
};

