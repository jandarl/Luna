import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import LunaLogo from '/luna-inventory-logo.jpg';
import UsrCtrlQuery from "../../Comms/UserControlQueries";
import '/src/fonts.css';
import './LogIn.css';

function LogInPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        window.addEventListener('beforeunload', logOutUser);

        return () => {
            window.removeEventListener('beforeunload', logOutUser);
        }
    })

    const logOutUser = (e) => {
        e.preventDefault();
        Promise.all([UsrCtrlQuery.logOut()]);
        e.returnValue = '';
    }

    function onHandleClick(){
       Promise.all([UsrCtrlQuery.logIn(username, password)]).then(function(){
            var logInfo = UsrCtrlQuery.getLogInfo();
            if(logInfo.success === true){
                if(logInfo.type === 1){
                    window.location.href = "#usrctrl";
                }
                else{
                    window.location.href = "#userinventory";
                }
            }else{
                alert("Invalid Log In attempt!");
            }
       })
    }

    return(
        <div id="log-in-parent">
            <img src={LunaLogo} id="luna-logo"/>
            <h1 className="kaushan-script-regular prevent-select" id="luna-banner">Luna Inventory System</h1>
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