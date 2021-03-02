const { Client, Collection } = require('discord.js');
const client = new Client();
const glob = require('glob');
const config = require('./config.json');
const ms = require('ms');
const chalk = require('chalk')
const mysql = require('mysql');
const { success, error, warning } = require("log-symbols");
connection = mysql.createConnection({
    host: config["daabase"].host,
    user: config["daabase"].user,
    password: config["daabase"].password,
    database: config["daabase"].name,
});
setInterval(function() {
    console.log(`\x1b[93m[Debug] \x1b[0mPinging SQL server to insure it hasn't timed out.`)
}, ms("10m"));
console.log(`\x1b[1mI have connected to the database! ${success}\x1b[0m`);

let num = 0;
setInterval(() => {
    const mysqldump = require('mysqldump')
    let newnum = num++;
    mysqldump({
        connection: {
            host: config["daabase"].host,
            user: config["daabase"].user,
            password: config["daabase"].password,
            database: config["daabase"].name,
        },
        dumpToFile: `./sql/backup${newnum}.sql`,
    });
}, 32400000);


//command handler
const fs = require('fs')
const { sep } = require("path");
client.prefix = config.prefix;
["commands", "aliases"].forEach(x => client[x] = new Collection());
const commandhandler = (dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}${sep}`).filter(files => files.endsWith(".js"));
        for (const file of commands) {
            const pull = require(`${dir}/${file}`);
            if (pull.help && typeof(pull.help.name) === "string" && typeof(pull.help.category) === "string") {
                if (client.commands.get(pull.help.name)) return;
                client.commands.set(pull.help.name, pull);
            }
        }
    });
};
commandhandler();


//event handler
const eventList = glob.sync("./events/**/*.js")
for (const file of eventList) {
    try {
        const event = require(file);
        let eventName = file.split("/").pop().split(".").shift()
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(file)];
    } catch (err) {
        console.log(`${error} Error loading event in ${file} you have an error for some reason`);
        console.error(err)
        continue;
    }
}

client.evente1 = (`\x1b[91mI encountred an Error I was not able to send a message in the logs channel`);
client.evente2 = (`\x1b[91mI encountred an Error I was not able to view Aduit Logs in`);
client.evente3 = (`\x1b[91mI encountred an Error I was not able to send a message in welcome/leave channel`)
client.evente4 = (`\x1b[91mI encountred an Error I was not able to send/view a message/see in the logs channel`)
client.evente5 = (`\x1b[91mI encountred an Error A user put an invaild command`)
client.evente6 = (`\x1b[91mI encountred an Error I was not able to delete the message`)
client.evente7 = (`\x1b[91mI encountred an Error I was not able to send an embed/or something happened with the embed`)
client.evente8 = (`\x1b[91mI encountred an Error I was not able to find/add a role to a user`)


client.login(config.token);