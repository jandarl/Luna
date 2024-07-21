import pg from 'pg';
import 'dotenv/config';
import dbFunctions from '../dbFunctions.js';

const db = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});


// All Insert to Database Table goes here

const insertUserGroup = (valueArray) => {
    const fields = ['group_name', 'group_description'];
    return dbFunctions.insertDataToTable(db, "user_groups", fields, valueArray);
};

const insertUserType = (valueArray) => {
    const fields = ['type_name', 'type_description'];
    return dbFunctions.insertDataToTable(db, "user_types", fields, valueArray);
};

const insertUser = (valueArray) => {
    const fields = ['user_name', 'user_password', 'user_description', 'user_group', 'user_type']; 
    return dbFunctions.insertDataToTable(db, "users", fields, valueArray);
};

const insertLogInfo = (valueArray) => {
    const fields = ['user_name', 'user_desc', 'user_type', 'user_group', 'login_success'];
    return dbFunctions.insertDataToTable(db, "login_info", fields, valueArray); 
};

// All Read from Database goes here

const getUserGroups = async () => {
    return await dbFunctions.readTableFromDB(db, "user_groups")
};

const getUserTypes = async () => {
    return await dbFunctions.readTableFromDB(db, "user_types")
};

const getAllUsers = async () => {
    return await dbFunctions.readTableFromDB(db, "users")
};

const getLogInInfo = async (username) => {
    const selectors = ['users.user_password', 'users.user_description', 'user_types.user_level', 'user_groups.group_section'];
    const join_tables = ['user_types', 'user_groups'];
    const join_conditions = ['user_types.type_id = users.user_type', 'user_groups.group_id = users.user_group'];
    username = `\'${username}\'`

    return await dbFunctions.readJoinedData(db, selectors, "users", join_tables, join_conditions, true, "users.user_name", username);
};

const getLastLogInfo = async () => {
    return await dbFunctions.readTableFromDB(db, "login_info");
};

const getAllUsersAvailable = async () => {
    const selectors = ['users.user_name', 'users.user_password', 'users.user_description', 'user_groups.group_name', 'user_types.type_name'];
    const join_tables = ['user_types', 'user_groups'];
    const join_conditions = ['user_types.type_id = users.user_type', 'user_groups.group_id = users.user_group'];

    return await dbFunctions.readJoinedData(db, selectors, "users", join_tables, join_conditions, false, "", "");
}

// All Update Table data of the Database goes here

const updateUserGroup = (field, value, condition) => {
    return dbFunctions.updateDataOfTable(db, "user_groups", field, value, "group_id", condition);
};

const updateUserType = (field, value, condition) => {
    return dbFunctions.updateDataOfTable(db, "user_types", field, value, "type_id", condition);
};

const updateUser = (field, value, condition) => {
    return dbFunctions.updateDataOfTable(db, "users", field, value, "user_id", condition);
};

// All Delete Table data of the Database goes here

const deleteUserGroup = (condition) => {
    return dbFunctions.deleteDataOfTable(db, "user_groups", "group_id", condition);
};

const deleteUserType = (condition) => {
    return dbFunctions.deleteDataOfTable(db, "user_types", "type_id", condition);
};

const deleteUser = (condition) => {
    return dbFunctions.deleteDataOfTable(db, "users", "user_id", condition);
};

const deleteLastLogIn = () => {
    return dbFunctions.deleteAllDataOfTable(db, "login_info");
}

// Export module goes here

const userDBConnect = {
    // Create Functions
    insertUserGroup,
    insertUserType,
    insertUser,
    insertLogInfo,

    // Read Functions
    getUserGroups,
    getUserTypes,
    getAllUsers,

    getLogInInfo,
    getLastLogInfo,

    getAllUsersAvailable,

    // Update Functions
    updateUserGroup,
    updateUserType,
    updateUser,

    // Delete Functions
    deleteUserGroup,
    deleteUserType,
    deleteUser,
    deleteLastLogIn
};

export default userDBConnect;






