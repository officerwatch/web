import Dexie, { Table } from "dexie";
import { Officer } from "./Officer";
import { Document } from "./Document";

class OfficerWatchDB extends Dexie {
    officer!: Table<Officer>;
    documents!: Table<Document>;
  
    constructor() {
      super("db");
      this.version(1).stores({
        officer: `++id, name, age, race, agency, title, photo, tags, updated`,
        documents: `++id, name, description`
      });
    }
  }

export const db = new OfficerWatchDB();