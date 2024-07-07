
// For Insert Data in a table

const insertDataToTable = (db, table, fieldArray, valueArray) => {
    return new Promise (function (resolve, reject) {
        const field = fieldArray.join(',');
        const values = valueArray.join(',');
        const query = `INSERT INTO ${table} (${field}) VALUES (${values}) RETURNING *`;

        db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`A new record has been added to table ${table}: ${JSON.stringify(results.rows[0])}`);
                } 
                else {
                    reject(new Error("No results found"));
                }
            });
    });
};

// For Read All data in a table

const readTableFromDB = async (db, table) => {
    try{
        return await new Promise(function (resolve, reject){
            const query = "SELECT * FROM " + table + ";";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }

                if (results && results.rows) {
                    resolve(results.rows);
                } 
                else {
                    reject(new Error("No results found"));
                }
            });
        });
    }
    catch(error_1){
        console.log(error_1);
        throw new Error(`Internal Server Error reading ${table} table`);
    }
};

// Read a Data from a Table

const readDataFromATable = async (db, table,  filter, condition) => {
    try{
        return await new Promise(function (resolve, reject){
            const query = `SELECT * FROM ${table} WHERE ${filter} = ${condition};`
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }

                if (results && results.rows) {
                    resolve(results.rows);
                } 
                else {
                    reject(new Error("No results found"));
                }
            });
        });
    }
    catch(error_1){
        console.log(error_1);
        throw new Error(`Internal Server Error reading ${table} table`);
    }
};

// Read Joined Data from tables

const readJoinedData = async (db, selectors, main_table, join_tables, join_conditions, filter, condition) => {
    var query = `SELECT ${selectors.join(",")} FROM ${main_table}`;

    for(let i = 0; i < join_tables.length; i++ ){
        var join_query = ` JOIN ${join_tables[i]} ON ${join_conditions[i]}`
        query += join_query;
    }

    query += ` WHERE ${filter} = ${condition};`;

     try{
        return await new Promise(function (resolve, reject){
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }

                if (results && results.rows) {
                    resolve(results.rows);
                } 
                else {
                    reject(new Error("No results found"));
                }
            });
        });
    }
    catch(error_1){
        console.log(error_1);
        throw new Error(`Internal Server Error Joined reading from ${main_table} table`);
    }
};


// For Update Data in a table

const updateDataOfTable = (db, table, field, value, filter, condition) => {
    return new Promise (function (resolve, reject){
        const query = `UPDATE ${table} SET ${field} = ${value} WHERE ${filter} = ${condition} RETURNING *`;

        db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`A record has been updated on table ${table}: ${JSON.stringify(results.rows[0])}`);
                } 
                else {
                    reject(new Error("No results found"));
                }
            });
    });
};

// For Delete Data in a table

const deleteDataOfTable = (db, table, filter, condition) => {
    return new Promise (function (resolve, reject){
        const query = `DELETE FROM ${table} WHERE ${filter} = ${condition}`;

        db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`A record has been deleted from table ${table} with ${filter} of ${condition}`);
                } 
                else {
                    reject(new Error("No results found"));
                }
            });
    });
};

// Exporting functions

const dbFunctions = {
    // Create Functions
    insertDataToTable,

    // Read Functions
    readTableFromDB,
    readDataFromATable,
    readJoinedData,

    // Update Functions
    updateDataOfTable,

    // Delete Functions
    deleteDataOfTable
}

export default dbFunctions;