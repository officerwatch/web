import React, { FormEvent, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

function Contribute() {

  const [document, setDocument] = useState({
    name: "",
    description: ""
  });

  function onSubmit(event: FormEvent) {
    db.documents.add(document);
    event.preventDefault();
    setDocument({
      name: "",
      description: ""
    });
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Contribute</h2>
        <h3>Add new document</h3>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              autoFocus
              placeholder="Enter name..."
              value={document.name}
              onChange={(ev) =>
                setDocument((document) => ({
                  ...document,
                  name: ev.target.value
                }))
              }
            />
          </label>
  
          <label>
            Description:
            <input
              type="text"
              placeholder="Enter name..."
              value={document.description}
              onChange={(ev) =>
                setDocument((document) => ({
                  ...document,
                  description: ev.target.value
                }))
              }
            />
          </label>
          <button type="submit">Add Document</button>
        </form>
    </main>
  );
}

  export default Contribute;