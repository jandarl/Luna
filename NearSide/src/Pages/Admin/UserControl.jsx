import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import UsrCtrlQuery from "../../Comms/UserControlQueries";
import '/src/fonts.css';
import './UserControl.css';

function UserControl(){

    const [allUsers, setAllUsers] = useState(UsrCtrlQuery.getAllUsers());
    const [selectedID, setSelectedID] = useState("");
    const [userInfo, setUserInfo] = useState(allUsers[0]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [userGroup, setUserGroup] = useState(0);
    const [userType, setUserType] = useState(false);

    useEffect(() => {
        Promise.all([UsrCtrlQuery.fetchAllUsers()]).then(function(){
            setAllUsers(UsrCtrlQuery.getAllUsers());
        })
    },[]);

    const onhandleTableClick = (e) => {
        const id = "#" + e.currentTarget.id;

        if(selectedID !== ""){
            document.querySelector(selectedID).classList.remove('tableItemSelected');
        }

        if(id !== ""){
            document.querySelector(id).classList.add('tableItemSelected');
            setSelectedID(id);
        }

        setUserInfo(allUsers[e.currentTarget.rowIndex - 1]);
    }

    const onHandleBtnClick = (e) => {

        if(e.currentTarget.id === "delete-button"){

        }
        else if(e.currentTarget.id === "modify-button"){

        }
        else if(e.currentTarget.id === "add-user-button"){
            console.log(username);
            console.log(password);
            console.log(description);
            console.log(userGroup);
            console.log(userType);
        }
    }

    function renderUseTable(){
        return(
            <Table striped bordered hover id="userTable">
                <thead>
                    <tr className="prevent-select" id="tableHeader">
                        <th className="tablehdrSm">#</th>
                        <th className="tablehdrMd">Username</th>
                        <th className="tablehdrMd">Password</th>
                        <th className="tablehdrLg">Description</th>
                        <th className="tablehdrMd">Group</th>
                        <th className="tablehdrMd">Type</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {allUsers.map((item, index) => 
                        <tr className="tableItem prevent-select" key={index} id={"tableItem" + index} onClick={onhandleTableClick}>
                            <td>{index + 1}</td>
                            <td>{item.user_name}</td>
                            <td>{item.user_password}</td>
                            <td>{item.user_description}</td>
                            <td>{item.group_name}</td>
                            <td>{item.type_name}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    function renderForm(){
        return(
            <Form id="usrCtrlForm">
                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="usrCtrlFormLabel-username">Username:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="UserName" onChange={(event) => setUsername(event.target.value)} className="usrCtrlFormInput"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="usrCtrlFormLabel-password">Password:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Password" onChange={(event) => setPassword(event.target.value)} className="usrCtrlFormInput"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="usrCtrlFormLabel-description">Description:</Form.Label>
                    <Col sm="12">
                        <Form.Control as="textarea" placeholder="Description" onChange={(event) => setDescription(event.target.value)} rows={3} className="usrCtrlFormInput" id="usrCtrlFormInput-description"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="usrCtrlFormLabel-usergroup">User Group:</Form.Label>
                    <Col sm="12">
                        <Form.Select className="usrCtrlFormInput" id="usrCtrlFormInput-usergroup" onChange={(event) => setUserGroup(event.target.value)}>
                            <option value="1">SuperGroup</option>
                            <option value="2">Philippines</option>
                            <option value="3">United States</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400">Administrator:</Form.Label>
                    <Col sm="12">
                        <Form.Check type="checkbox" id="admin-chkbox" onChange={(event) => setUserType(!userType)}/>
                    </Col>
                </Form.Group>
            </Form>
        )
    }

    return(
        <>
            <h1 className="kaushan-script-regular pageBanner prevent-select">User Control</h1>
            <div id="tableDiv">
                {renderUseTable()}
                <Button variant="primary" size="lg" id="delete-button" className="kreon-400" onClick={onHandleBtnClick}>Delete</Button>
                <Button variant="primary" size="lg" id="modify-button" className="kreon-400" onClick={onHandleBtnClick}>Modify</Button>
            </div>
            <div id="formDiv">
                {renderForm()}
                <Button variant="primary" size="lg" id="add-user-button" className="kreon-400" onClick={onHandleBtnClick}>Add User</Button>
            </div>
        </>
    )
};

export default UserControl;