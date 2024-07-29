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
    const [allGroups, setAllGroups] = useState(UsrCtrlQuery.getAllGroups());
    const [selectedID, setSelectedID] = useState("");
    const [userInfo, setUserInfo] = useState(allUsers[0]);
    const [user_id, setUserId] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [userGroup, setUserGroup] = useState(1);
    const [userType, setUserType] = useState(false);
    const [modifyMode, setModifyMode] = useState(false);

    useEffect(() => {
        Promise.all([UsrCtrlQuery.fetchAllUsers(), UsrCtrlQuery.fetchAllGroups()]).then(function(){
            setAllUsers(UsrCtrlQuery.getAllUsers());
            setAllGroups(UsrCtrlQuery.getAllGroups());
        })
    },[]);

    function clearValues(){
        setUsername("");
        setPassword("");
        setDescription("");
        setUserGroup(allGroups[0].group_id);
        setUserType(false);
        setModifyMode(false);
    }

    function checkValidInputs(){
        var retval = true;

        if((username === "") || (password === "") || (description === "")){
            alert("Invalid information in the add user attempt!");
            retval = false;
        }

        return retval;
    }

    const onhandleTableClick = (e) => {
        const id = "#" + e.currentTarget.id;

        if(selectedID !== ""){
            document.querySelector(selectedID).classList.remove('userTableItemSelected');
        }

        if(id !== ""){
            document.querySelector(id).classList.add('userTableItemSelected');
            setSelectedID(id);
        }

        setUserInfo(allUsers[e.currentTarget.rowIndex - 1]);
    }

    const onHandleBtnClick = (e) => {
        if(e.currentTarget.id === "delete-user-button"){
            if(userInfo !== undefined){
                Promise.all([UsrCtrlQuery.deleteUser(userInfo.user_id)]).then(function(){
                    Promise.all([UsrCtrlQuery.fetchAllUsers()]).then(function(){
                    setAllUsers(UsrCtrlQuery.getAllUsers());
                    })
                })
            }
        }
        else if(e.currentTarget.id === "modify-seluser-button"){
            if(userInfo !== undefined){
                setUserId(userInfo.user_id);
                setUsername(userInfo.user_name);
                setPassword(userInfo.user_password);
                setDescription(userInfo.user_description);

                allGroups.map((item) => {
                    if(userInfo.group_name === item.group_name){
                        setUserGroup(item.group_id);
                    }
                })

                setUserType((userInfo.type_name === "SuperUser") ? true : false);
                setModifyMode(true);
            }
        }
        else if(e.currentTarget.id === "clear-user-button"){
            clearValues();
        }
        else if(e.currentTarget.id === "modify-user-button"){
            if(checkValidInputs()){
                Promise.all([UsrCtrlQuery.updateUser(user_id, username, password, description, userGroup, userType)]).then(function(){
                    Promise.all([UsrCtrlQuery.fetchAllUsers()]).then(function(){
                        setAllUsers(UsrCtrlQuery.getAllUsers());
                        clearValues();
                    })
                })
            }
        }
        else if(e.currentTarget.id === "add-user-button"){
            if(checkValidInputs()){
                Promise.all([UsrCtrlQuery.insertUser(username, password, description, userGroup, userType)]).then(function(){
                    Promise.all([UsrCtrlQuery.fetchAllUsers()]).then(function(){
                        setAllUsers(UsrCtrlQuery.getAllUsers());
                        clearValues();
                    })
                })
            }
        }
    }

    function renderTableBody(){
        if(allUsers.length > 0){
            return(
                <tbody id="user-table-body">
                    {allUsers.map((item, index) => 
                        <tr className="tableItem prevent-select" key={item.user_id} id={"table-item-" + index} onClick={onhandleTableClick}>
                            <td>{index + 1}</td>
                            <td>{item.user_name}</td>
                            <td>{item.user_password}</td>
                            <td>{item.user_description}</td>
                            <td>{item.group_name}</td>
                            <td>{item.type_name}</td>
                        </tr>
                    )}
                </tbody>
            )
        }
    }

    function renderUserTable(){
        return(
            <Table striped bordered hover id="user-table">
                <thead>
                    <tr className="prevent-select" id="user-table-header">
                        <th className="userTablehdrSm">#</th>
                        <th className="userTablehdrMd">Username</th>
                        <th className="userTablehdrMd">Password</th>
                        <th className="userTablehdrLg">Description</th>
                        <th className="userTablehdrMd">Group</th>
                        <th className="userTablehdrMd">Type</th>
                    </tr>
                </thead>
                {renderTableBody()}
            </Table>
        )
    }

    function renderForm(){
        return(
            <Form id="user-ctrl-form">
                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="user-form-label-username">Username:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="UserName" onChange={(event) => setUsername(event.target.value)} className="usrCtrlFormInput" value={username}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="user-form-label-password">Password:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Password" onChange={(event) => setPassword(event.target.value)} className="usrCtrlFormInput" value={password}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="user-form-label-description">Description:</Form.Label>
                    <Col sm="12">
                        <Form.Control as="textarea" placeholder="Description" onChange={(event) => setDescription(event.target.value)} rows={3} className="usrCtrlFormInput" id="user-form-input-description" value={description}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400" id="user-form-label-usergroup">User Group:</Form.Label>
                    <Col sm="12">
                        <Form.Select className="usrCtrlFormInput" id="user-form-input-usergroup" onChange={(event) => setUserGroup(event.target.value)} value={userGroup}>
                            {allGroups.map((item) => 
                              <option value={item.group_id}>{item.group_name}</option>
                            )}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="usrCtrlFormGroup">
                    <Form.Label column sm="2" className="usrCtrlFormLabel kreon-400">Administrator:</Form.Label>
                    <Col sm="12">
                        <Form.Check type="checkbox" id="user-admin-chkbox" onChange={(e) => e.target.checked ? setUserType(true) : setUserType(false)} checked={userType}/>
                    </Col>
                </Form.Group>
            </Form>
        )
    }

    return(
        <>
            <h1 className="kaushan-script-regular pageBanner prevent-select">User Control</h1>
            <div id="user-table-div">
                {renderUserTable()}
                <Button variant="primary" size="lg" id="modify-seluser-button" className="kreon-400 userTableButton" onClick={onHandleBtnClick}>Modify</Button>
                <Button variant="primary" size="lg" id="delete-user-button" className="kreon-400 userTableButton" onClick={onHandleBtnClick}>Delete</Button>
            </div>
            <div id="user-form-div">
                {renderForm()}
                <Button variant="primary" size="lg" id="clear-user-button" className="kreon-400 userButton" onClick={onHandleBtnClick}>Clear</Button>
                <Button variant="primary" size="lg" id="modify-user-button" disabled={!modifyMode} className="kreon-400 userButton" onClick={onHandleBtnClick}>Modify User</Button>
                <Button variant="primary" size="lg" id="add-user-button" disabled={modifyMode} className="kreon-400 userButton" onClick={onHandleBtnClick}>Add User</Button>
            </div>
        </>
    )
};

export default UserControl;