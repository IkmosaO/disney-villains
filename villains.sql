CREATE DATABASE villainsDB;

CREATE USER 'villainsUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'villainsPassword';

GRANT ALL ON villainsDB.* TO 'villainsUser'@'localhost';

USE villainsDB;

CREATE TABLE villainsTables (
	id INT auto_increment,
    name VARCHAR(255),
    movie VARCHAR(255),
    slug VARCHAR(255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW(),
    deletedAt DATETIME,
    PRIMARY KEY(id)
);