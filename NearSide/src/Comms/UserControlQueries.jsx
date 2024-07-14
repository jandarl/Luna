
var lastLogInfo = {
    username: "",
    description: "",
    type: "",
    group: "",
    success: false
};

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
        })
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
        })
    })
};

function fetchLogInfo(){
    fetch('http://localhost:3050/getlogin')
      .then(response =>  response.json())
      .then(data => {
        lastLogInfo.username = data.user_name;
        lastLogInfo.description = data.user_desc;
        lastLogInfo.type = data.user_type;
        lastLogInfo.group = data.user_group;
        lastLogInfo.success = data.login_success;
    });
};

function getLogInfo(){
    return lastLogInfo;
}

function logOut(){
    fetch(`http://localhost:3050/deleteLogIn`, {
      method: 'DELETE',
    })
    .then(response => response.text())
    .then(data => {
        //console.log(data);
    });

    lastLogInfo.username = "";
    lastLogInfo.description = "";
    lastLogInfo.type = "";
    lastLogInfo.group = "";
    lastLogInfo.success = false;
};

const UsrCtrlQuery = {
    logIn,
    fetchLogInfo,
    getLogInfo,
    logOut
};

export default UsrCtrlQuery;