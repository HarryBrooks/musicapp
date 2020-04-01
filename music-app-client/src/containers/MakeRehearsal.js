import React, { useState } from 'react';
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import './MakeRehearsal.css';
import { API } from 'aws-amplify';

const MakeRehearsal = () => {

    const [fields, handleFieldChange] = useFormFields({
        number_bars: 100,
        tempo: 100,
        instruments: 1,
        passcode: ""
    });
    const [rehearsalMarkings, setRehearsalMarkings] = useState([])
    const [sessionCode, setSessionCode] = useState(0)

    const addRehearsalMarking = () => {
        setRehearsalMarkings([...rehearsalMarkings, {
            id: rehearsalMarkings.length,
            value: 1
        }])
    }

    const removeRehearsalMarking = () => {
        setRehearsalMarkings(rehearsalMarkings.slice(0, -1))
    }

    const changeRehearsalMarking = (index) => e => {
        let newArr = [...rehearsalMarkings];
        newArr[index].value = e.target.value;
        setRehearsalMarkings(newArr);
    }

    function validateForm() {
        return fields.passcode.length > 0;
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            number_instruments: fields.instruments,
            number_bars: fields.number_bars,
            tempo: fields.tempo,
            passcode: fields.passcode,
            rehearsalMarkings
        }
        console.log(data)
        API.post("create", "", {
            body: data
        }).then(response => {
            console.log(response)
            setSessionCode(response)
        }).catch(error => {
            console.log(error.response.data.message)
        })
    }

    const render = () => {
        if(sessionCode === 0) {
            return(
            <div className="makeRehearsal">
                <h1>Make rehearsal</h1>
                <form onSubmit={handleSubmit}>
                <FormGroup controlId="instruments" bsSize="large">
                    <ControlLabel>Number of instruments</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        min="1"
                        value={fields.instruments}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="number_bars" bsSize="large">
                    <ControlLabel>Number of bars</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        min="0"
                        value={fields.number_bars}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="tempo" bsSize="large">
                    <ControlLabel>Tempo</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        min="0"
                        value={fields.tempo}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                {rehearsalMarkings.map(marking => 
                    <FormGroup bsSize="large" key={marking.id}>
                        <ControlLabel>{"Rehearsal mark " + (marking.id+1)}</ControlLabel>
                        <FormControl
                            autoFocus
                            type="number"
                            min="1"
                            max={fields.number_bars}
                            value={marking.value}
                            onChange={changeRehearsalMarking(marking.id)}
                        />
                    </FormGroup>
                )}
                <Button
                    block 
                    bsSize="small"
                    onClick={addRehearsalMarking}
                    >
                    Add rehearsal marking
                </Button>
                {rehearsalMarkings.length > 0 && <Button
                    block 
                    bsSize="small"
                    onClick={removeRehearsalMarking}
                    >
                    Remove rehearsal marking
                </Button>}
                <FormGroup controlId="passcode" bsSize="large" className="passcode">
                    <ControlLabel>Passcode</ControlLabel>
                    <FormControl
                        autoFocus
                        type="password"
                        value={fields.passcode}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    className="submitButton"
                    disabled={!validateForm()}
                    >
                    Create
                </Button>
                </form>
            </div> )
        } else {
            return (
                <div>
                    <h3>Session code: {sessionCode}</h3>
                </div>
            )
        }
    }



    return (
        render()
    )
}

export default MakeRehearsal