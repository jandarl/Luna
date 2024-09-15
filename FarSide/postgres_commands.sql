
/*Server Creation*/
CREATE DATABASE luna_database_server
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

/*user types table*/
CREATE TABLE user_types (
	type_id SERIAL NOT NULL,
	type_name VARCHAR(64) NOT NULL,
	type_description VARCHAR(255) NOT NULL,
	user_level INT NOT NULL,
	PRIMARY KEY (type_id)
);

