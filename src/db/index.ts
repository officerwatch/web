import Dexie, { Table } from "dexie";
import { Officer } from "./Officer";
import { Document } from "./Document";
import { Object } from "./Object";
import { rejects } from "assert";

class OfficerWatchDB extends Dexie {
    officer!: Table<Officer>;
    documents!: Table<Document>;
    objects!: Table<Object>;
  
    constructor() {
      super("db");
      this.version(1.2).stores({
        officer: `++id, name, age, race, agency, title, photo, tags, ipfsHash, parent, children, updated`,
        documents: `++id, name, description`,
        objects: `id, objType, name, ipfsHash, parent, children`
      });
    }
  }

export const db = new OfficerWatchDB();

// clears local offline storage before fetching new data
export function stateClear () {
  return new Promise(resolve => {
    console.log('app state refreshed, offline storage cleared');
    setTimeout(() => { resolve(db.objects.clear()) }, 500);
  });
}

// takes a json object of type Object and 
// inserts it into local offline storage
export function stateLoad (data: Object) {
  return new Promise(resolve => {
    console.log(data.id +' state loaded into offline storage');
    resolve(db.objects.add(data));
  });
}

export function stateMutate (data: Object) {
  return new Promise((resolve, reject) => {
    try {
      const ipfsData = async () => {
        const response = await fetch("https://ipfs.officer.watch/ipfs/" + data.ipfsHash);
        console.log(data.id +' ipfs object ' + data.ipfsHash + ' loaded into offline storage');
        console.log(response);
      }
      resolve(ipfsData());
    } catch (e) {
      reject('data failed to load: '+ e);
    }
  });
}