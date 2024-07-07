
function logIn(username, password){
    fetch('http://localhost:3050/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({username, password}),
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
};

const UserControl = {
    logIn
};

export default UserControl;