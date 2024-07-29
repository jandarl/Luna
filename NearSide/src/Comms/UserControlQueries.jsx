
var lastLogInfo = {
    username: "",
    description: "",
    type: "",
    group: "",
    success: false
};

var allUsers = [];
var userGroups = [];

function validateLogIn(username, data){
    if(data.length !== 3){
        lastLogInfo.description = data;
        lastLogInfo.success = false;
    }else{
        lastLogInfo.username = username;
        lastLogInfo.description = data[0];
        lastLogInfo.type = data[1];
        lastLogInfo.group = data[2];
        lastLogInfo.success = true;

        fetch('http://localhost:3050/setlogin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({lastLogInfo}),
        })
        .then(response => response.json())
        .then((data) => {
        // console.log(data);
        });
    }
};

function logIn(username, password){
    return new Promise(function(resolve, reject){
        fetch('http://localhost:3050/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({username, password}),
        })
        .then(response => response.json())
        .then((data) => {
            validateLogIn(username, data);
            resolve('200');
        });
    });
};

function fetchLogInfo(){
    return new Promise( function(resolve, reject){
      fetch('http://localhost:3050/getlogin')
      .then(response =>  response.json())
      .then(data => {
            lastLogInfo.username = data.user_name;
            lastLogInfo.description = data.user_desc;
            lastLogInfo.type = data.user_type;
            lastLogInfo.group = data.user_group;
            lastLogInfo.success = data.login_success;
            resolve('200');
        });
    });
};

function getLogInfo(){
    return lastLogInfo;
}

function logOut(){
    return new Promise(function (resolve, reject) {
        fetch(`http://localhost:3050/deletelogin`, {
            method: 'DELETE',
        })
        .then(response => response.text())
        .then(data => {
            //console.log(data);
            resolve('200');
        });

        lastLogInfo.username = "";
        lastLogInfo.description = "";
        lastLogInfo.type = "";
        lastLogInfo.group = "";
        lastLogInfo.success = false;

        allUsers = [];
        userGroups = [];
    });
};

// User Control

function insertUser(username, password, description, user_group, user_type){
    var userType = user_type ? 1 : 2;

    return new Promise(function(resolve, reject){
        fetch('http://localhost:3050/adduser',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({username, password, description, user_group, userType}),
        })
        .then(response => response.json())
        .then((data) => {
            resolve('200');
        });
    });
};

function fetchAllGroups(){
    return new Promise(function (resolve, reject){
        fetch('http://localhost:3050/getusergroups')
        .then(response =>  response.json())
        .then(data => {
           userGroups = data;
           resolve('200');
        });
    });
};

function getAllGroups(){
    return userGroups;
}

function fetchAllUsers(){
    return new Promise(function (resolve, reject){
        fetch('http://localhost:3050/getallusers')
        .then(response =>  response.json())
        .then(data => {
           allUsers = data;
           resolve('200');
        });
    });
};

function getAllUsers(){
    return allUsers;
};

function updateUser(user_id, username, password, description, user_group, user_type){
    var userType = user_type ? 1 : 2;

    return new Promise(function(resolve, reject){
        fetch(`http://localhost:3050/${user_id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({username, password, description, user_group, userType}),
        })
        .then(response => response.json())
        .then((data) => {
            resolve('200');
        });
    });
};

function deleteUser(user_id){
    return new Promise(function(resolve, reject){
        fetch(`http://localhost:3050/${user_id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({user_id}),
        })
        .then(response => response.json())
        .then((data) => {
            resolve('200');
        });
    });
};

const UsrCtrlQuery = {

    // LogIn
    logIn,
    fetchLogInfo,
    getLogInfo,
    logOut,

    // User Control
    insertUser,
    fetchAllGroups,
    getAllGroups,
    fetchAllUsers,
    getAllUsers,
    updateUser,
    deleteUser
};

export default UsrCtrlQuery;