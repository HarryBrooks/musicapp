import React, { useState } from 'react';
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import './MakeRehearsal.css';

const MakeRehearsal = () => {

    const [fields, handleFieldChange] = useFormFields({
        number_bars: 0,
        tempo: 0
    });
    const [rehearsalMarkings, setRehearsalMarkings] = useState([])

    const addRehearsalMarking = () => {
        setRehearsalMarkings([...rehearsalMarkings, {
            id: rehearsalMarkings.length,
            value: 0
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

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            number_bars: fields.number_bars,
            tempo: fields.tempo,
            rehearsalMarkings
        }
        console.log(data)
    }

    return (
        <div className="makeRehearsal">
            <h1>Make rehearsal</h1>
            <form onSubmit={handleSubmit}>
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
                        min="0"
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
            <Button
                block
                type="submit"
                bsSize="large"
                className="submitButton"
                >
                Create
            </Button>
            </form>
        </div>
    )
}

export default MakeRehearsal