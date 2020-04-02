import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Button } from "react-bootstrap";

const ShowRehearsals = () => {
    const [rehearsals, setRehearsals] = useState([]);

    useEffect(() => {
        async function onLoad() {
            let results = await loadResult();
            setRehearsals(results);
        }
        onLoad();
    },[]);

    const loadResult = () => {
        return API.get("userRehearsals", "");
    }

    async function combineVideos(event) {
        const result = await API.get("combine","/" + event.target.value)
        console.log(result);
        if(result.status === true) {
            console.log("Success");
        }
    }

    async function deleteRehearsal(event) {
        const result = await API.get("deleteRehearsal","/" + event.target.value)
        if(result.status === true) {
            let rehearsals = await loadResult();
            setRehearsals(rehearsals);
        }
    }

    return (
        <div className="allRehearsals">
            <h1>All Rehearsals</h1>
            {rehearsals.map(rehearsal => {
                console.log(rehearsal)
                return (
                    <div className="rehearsal" key={rehearsal.rehearsalId}>
                        <h4>Session Code: {rehearsal.session_code}</h4>
                        <Button
                            onClick={combineVideos}
                            value={rehearsal.rehearsalId}
                        >
                            Combine Videos
                        </Button>
                        <Button
                            onClick={deleteRehearsal}
                            value={rehearsal.rehearsalId}
                        >
                            Delete
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowRehearsals;