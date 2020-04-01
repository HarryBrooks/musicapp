import React, { useEffect } from 'react';
import { API } from 'aws-amplify';

const ShowRehearsals = () => {

    useEffect(() => {
        async function onLoad() {
            let results = await loadResult();
            console.log(results);
        }
        onLoad();
    });

    const loadResult = () => {
        return API.get("userRehearsals", "");
    }
    return (
        <div className="allRehearsals">
            <h1>All Rehearsals</h1>
        </div>
    )
}

export default ShowRehearsals;