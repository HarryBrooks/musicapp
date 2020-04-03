import React, { useState } from "react";
import "./Home.css";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import { API } from 'aws-amplify';
import { Redirect } from "react-router-dom";

export default function Home() {
  const [redirect, setRedirect] = useState(false);
  const [rehearsal, setRehearsal] = useState({})
  const [fields, handleFieldChange] = useFormFields({
    session_id: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    API.post("musicianRehearsal", "", {
      body: {
        sessionId: fields.session_id,
        password: fields.password
      }
    }).then(response => {
        console.log(response[0])
        setRehearsal(response[0]);
        setRedirect(true);
    }).catch(error => {
        console.log(error.response.data.message)
    })
  }


  function validateForm() {
    return fields.session_id >= 10000 && fields.session_id <= 99999 && fields.password.length > 0;
  }

  if(redirect) {
    console.log(rehearsal)
    return <Redirect to={{
      pathname: '/makeVideo',
      state: { rehearsal }
    }}/>
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Remote Bands</h1>
        <p>A simple music collab app</p>
        <form onSubmit={handleSubmit}>
        <FormGroup controlId="session_id" bsSize="large">
          <ControlLabel>Session ID</ControlLabel>
          <FormControl
            autoFocus
            type="number"
            value={fields.session_id}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          disabled={!validateForm()}
        >
          Make recording
        </LoaderButton>
      </form>
      </div>
    </div>
  );
}