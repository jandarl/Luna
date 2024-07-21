
var lastLogInfo = {
    username: "",
    description: "",
    type: "",
    group: "",
    success: false
};

var allUsers = [];

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
    });
};

// User Control

function fetchAllUsers(){
    return new Promise(function (resolve, reject){
      fetch('http://localhost:3050/getallusers')
      .then(response =>  response.json())
      .then(data => {
           allUsers = data;
           resolve('200');
        });
    });
}

function getAllUsers(){
    return allUsers;
}

const UsrCtrlQuery = {

    // LogIn
    logIn,
    fetchLogInfo,
    getLogInfo,
    logOut,

    // User Control
    fetchAllUsers,
    getAllUsers
};

export default UsrCtrlQuery;