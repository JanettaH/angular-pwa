import * as aPouchDB from 'pouchdb-browser';

const PouchDB = aPouchDB['default'];


import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  db: any;

  constructor() {
  }

  init() {
    this.db = new PouchDB('todos');
  }

  getAll() {
    return this.db.allDocs({include_docs: true});
  }

  create(title: string) {
    return this.db.post({title});
  }

  delete(doc) {
    return this.db.remove(doc);
  }

  track() {
    return this.db.changes({
      live: true,
      since: 'now',
      include_docs: true
    });
  }

  sync() {
    const remoteDb = new PouchDB('http://18.208.138.248:5984/todos');
    return this.db.sync(remoteDb, {live: true})
      .on('change', (info) => {
        console.log('Change from remote');
        console.log(info);
      });
  }
}
