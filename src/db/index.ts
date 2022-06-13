import Dexie, { Table } from "dexie";
import { Officer } from "./Officer";
import { Document } from "./Document";
import { Object } from "./Object";
import { IpfsCache } from "./IpfsCache";

class OfficerWatchDB extends Dexie {
    officers!: Table<Officer>;
    documents!: Table<Document>;
    objects!: Table<Object>;
    ipfscache!: Table<IpfsCache>;
  
    constructor() {
      super("db");
      this.version(1.5).stores({
        officers: `++id, name, age, race, agency, title, photo, tags, ipfsHash, parent, children, updated`,
        documents: `++id, name, description`,
        objects: `id, objType, name, ipfsHash, parent, children`,
        ipfscache: `id, data`
      });
    }
  }

export const db = new OfficerWatchDB();

// clears local offline storage before fetching new data
export function stateClear () {
  return new Promise(resolve => {
    console.log('app state refreshed, offline storage cleared');
    const returnStatus = async () => {
      await db.objects.clear();
      await db.officers.clear();
      await db.documents.clear();
      await db.ipfscache.clear();
    }
    resolve(returnStatus());
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

export function stateCachify () {
  return new Promise((resolve, reject) => {
    const ipfsCacheGrab = async () => {
      try {
        const responze = await fetch("https://graphql.officer.watch/graphql/", 
                                { 
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    query: `{ objectGetIpfs }`,
                                    variables: {
                                      now: new Date().toISOString(),
                                    },
                                  }),
                                });
        console.log();
        return responze.json();
      } catch (e) {
        reject('data failed to load: '+ e);
      }
    }
    resolve(ipfsCacheGrab());
  });
}

export function stateMutate (data: Object) {
  return new Promise((resolve, reject) => {
    const ipfsData = async () => {
      try {
        // TODO: add support for other objTypes
        if (data.objType == "officer") {
          let mutation = await db.officers.add({
                                                id: data.id,
                                                name: data.name,
                                                age: 0,
                                                race: "",
                                                agency: "",
                                                title: "",
                                                photo: "",
                                                tags: "",
                                                ipfsHash: data.ipfsHash,
                                                parent: data.parent,
                                                children: data.children,
                                                updated: ""
                                              });
        }
        console.log(data.id + " placed into searchable index");
        resolve ( true );
      } catch (e) {
        reject('data failed to load: '+ e);
      }
    }
    resolve(ipfsData());
  });
}