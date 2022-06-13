import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export function CountOfficers () {

    const officerCount = useLiveQuery(() => db.officers.count());

    return (
        <strong>{officerCount}</strong>
    )
}

export function CountDocuments () {

    const documentCount = useLiveQuery(() => db.documents.count());

    return (
        <strong>{documentCount}</strong>
    )
}