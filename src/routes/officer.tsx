import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { db } from '../db';
import OfficerPage from '../components/officer';


function check (pid: string) {
    return new Promise((resolve, reject) => {
        try {
            let count = db.officers.where('id').equals(pid).count();
            resolve(count);
        } catch (e) {
            reject(false);
            console.error(e);
        }
    });
}

function grab (pid: string) {
    return new Promise((resolve, reject) => {
        try {
            let data = db.officers.get(pid);
            resolve (data);
        } catch (e) {
            reject (false);
            console.error(e);
        }
    });
}

function Officer () {
    const [objLoad, setObjLoad] = useState(false);
    const [objDataStore, setObjDataStore] = useState({});


    // extract id from url path
    type urlData = { pid: string; };
    let { pid } = useParams<urlData>();

    useEffect(() => {
        // check if id is valid
        if (pid) {
            // check to see if object is valid
            check(pid).then(function (result) {
                if (result == 1) {
                    setObjLoad((objLoad) => true);
                }
            });

            // grab object details
            grab(pid).then(function (response: any){
                setObjDataStore((objDataStore) => response);
            });

        } else {
            console.log('no valid id provided');
            console.log('provided id: ' + pid);
            // TODO: display no officer found error message
        }
    }, []);

    return (
        <main>
            {objLoad ? 
                <div>
                    <OfficerPage data={objDataStore} />
                </div>
             : (
                <span>no records were found for this officer</span>
            )}
        </main>
    )
}

export default Officer;