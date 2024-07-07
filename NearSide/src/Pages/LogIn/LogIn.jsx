import React, {useState} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import LunaLogo from '/luna-inventory-logo.jpg';
import UserControl from "../../Comms/UserControlQueries";
import '/src/fonts.css';
import './LogIn.css';

function LogInPage({workspaceMode}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onHandleClick(){
        UserControl.logIn(username, password);
    }

    return(
        <div id="log-in-parent">
            <img src={LunaLogo} id="luna-logo"/>
            <h1 className="kaushan-script-regular" id="luna-banner">Luna Inventory System</h1>
            <Form id="formParent">
                <Form.Group as={Row} className="formGroup" controlId="formPlaintextUsername">
                    <Form.Label column sm="2" className="formLabel kreon-400">Username:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="UserName" onChange={(event) => setUsername(event.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="formGroup" controlId="formPlaintextPassword">
                    <Form.Label column sm="2" className="formLabel kreon-400" id="formLabel-password">Password:</Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    </Col>
                </Form.Group>
                </Form>
                <Button variant="primary" size="lg" id="logIn-button" className="kreon-400" onClick={onHandleClick}>Log In</Button>
        </div>
    )
};

export default LogInPage;