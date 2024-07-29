import 'dotenv/config';
import userDBConnect from "./userDBConnect.js";
import returnCodes from "./returnCode.js";

// LogIn functions

const logIn = async (body) => {
    const {username, password} = body;

    const userInfo = await userDBConnect.getLogInInfo(username);

    if(userInfo.length === 0) return returnCodes.ErrorNotFound;
    if(userInfo.length > 1) return returnCodes.ErrorDuplicateUser;

    const {user_password, user_description, user_level, group_section} = userInfo[0];
   
    if(password !== user_password) return returnCodes.ErrorWrongPassword;

    return [user_description, user_level, group_section];
};

const setLastLogInfo = (body) => {
    const valueArray = [`\'${body.lastLogInfo.username}\'`, `\'${body.lastLogInfo.description}\'`, `${body.lastLogInfo.type}`, `${body.lastLogInfo.group}`, `${body.lastLogInfo.success}`];
    const retval = userDBConnect.insertLogInfo(valueArray);
    return retval;
}

const getLastLogInfo = async () => {
    const userInfo = await userDBConnect.getLastLogInfo();

    if(userInfo.length === 0) return returnCodes.ErrorNotFound;
    if(userInfo.length > 1) return returnCodes.ErrorDuplicateUser;
    
    return userInfo;
};

const deleteLastLogInfo = () => {
    const userInfo = userDBConnect.deleteLastLogIn();
    return userInfo;
};


// User Control functions

const insertUser = async (body) => {
    const valueArray = [`\'${body.username}\'`, `\'${body.password}\'`, `\'${body.description}\'`, `${body.user_group}`, `${body.userType}`];
    const retval = userDBConnect.insertUser(valueArray);
    return retval;
};

const getAllUserGroups = async () => {
    const retval = await userDBConnect.getUserGroups();
    if(retval.length === 0) returnCodes.ErrorNotFound;
    return retval;
}

const fetchAllUsers = async () => {
    const allUsers = await userDBConnect.getAllUsersAvailable();
    if(allUsers.length === 0) return returnCodes.ErrorNotFound;

    for (var i = 0; i < allUsers.length; i++) {
        const {user_name} = allUsers[i];
        if(user_name === process.env.SUPER_USER){
            allUsers.splice(i, 1);
        }
    }

    return allUsers;
};

const updateUser = async (id, body) => {
    const valueArray = [`\'${body.username}\'`, `\'${body.password}\'`, `\'${body.description}\'`, `${body.user_group}`, `${body.userType}`];
    const retval = userDBConnect.updateAllUserData(valueArray, id);
    return retval;
};

const deleteUser = async (id) => {
    return userDBConnect.deleteUser(id);
};

const userControls = {

    // LogIn functions
    logIn,
    setLastLogInfo,
    getLastLogInfo,
    deleteLastLogInfo,

    // User Control functions

    insertUser,
    getAllUserGroups,
    fetchAllUsers,
    updateUser,
    deleteUser
}

export default userControls;