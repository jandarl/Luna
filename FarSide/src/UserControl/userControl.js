import userDBConnect from "./userDBConnect.js";
import returnCodes from "../returnCode.js";

const logIn = async (body) => {
    const {username, password} = body;

    const userInfo = await userDBConnect.getLogInInfo(username);

    if(userInfo.length === 0) return returnCodes.ErrorNotFound;
    if(userInfo.length > 1) return returnCodes.ErrorDuplicateUser;

    const {user_name, user_password, user_level, group_section} = userInfo[0];
   
    if(password !== user_password) return returnCodes.ErrorWrongPassword;

    return [user_name, user_level, group_section];
}
    

const userControls = {
    logIn
}

export default userControls;