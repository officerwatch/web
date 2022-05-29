import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export function CountOfficers () {

    const officerCount = useLiveQuery(() => db.officer.count());

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