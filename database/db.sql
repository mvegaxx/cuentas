CREATE DATABASE database_links;

USE database_links;

-- users table
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2 ;

DESCRIBE users

--links table
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT (11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links 
    ADD PRIMARY KEY (id);

 ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2 ;

--gastos table
CREATE TABLE gastos (
    id INT(11) NOT NULL,
    Tienda VARCHAR(150) NOT NULL,
    Cantidad INT(11) NOT NULL,
    description TEXT,
    user_id INT (11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fkg_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE gastos 
    ADD PRIMARY KEY (id);

 ALTER TABLE gastos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =2 ;	
    ALTER TABLE nombre_tabla 
    CHANGE nombre_viejo_columna nombre_nuevo_columna  VARCHAR() NOT NULL;
    ALTER TABLE Persons
        ADD DateOfBirth date
    ALTER TABLE gastos CHANGE Tienda tienda  VARCHAR(150) NOT NULL;

SELECT 
    *
FROM
    gastos
WHERE
    fecha IS NULL;  


DESCRIBE links;