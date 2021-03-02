CREATE DATABASE sticky;
USE sticky;
CREATE TABLE guilds(
    guild varchar(255) DEFAULT 'None Set',
    channel varchar(255) DEFAULT 'None Set',
    channelname varchar(255) DEFAULT 'None Set',
    msg varchar(255) DEFAULT 'None Set',
    lastmsg  varchar(255) DEFAULT 'None Set',
    num  varchar(255) DEFAULT '0'
);

CREATE TABLE servers(
    guild varchar(255) DEFAULT 'None Set',
    prefix varchar(255) DEFAULT '!',
    embedcolor varchar(255) DEFAULT '#00000'
);