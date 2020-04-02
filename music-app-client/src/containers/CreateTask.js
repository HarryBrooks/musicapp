import React from 'react';
import {Container} from "react-bootstrap";

const CreateTask = (props) => {
    return (
        <Container>
            <h1>Create a task</h1>
            <button onClick={props.signOut}>Sign out</button>
        </Container>
    )
}

export default CreateTask;