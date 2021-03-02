const chalk = require('chalk');
const config = require('../config.json');

module.exports = async(client) => {
    console.log(chalk.red `[MADE BY NAT2K15 & APEXI] ` + chalk.white `${client.user.tag} is now online!`);

    client.guilds.cache.forEach(async function(guild) {
        connection.query(`SELECT guild FROM servers WHERE guild = '${guild.id}'`, function(e1, r1) {
            if (!r1[0]) {
                connection.query(`INSERT INTO servers SET guild = '${guild.id}'`);
                if (e1) console.log(e1)
            }
        })
        console.log(chalk.blue `${guild.id} || ${guild.name} || ${guild.owner.user.username} ` + chalk.white `I am watching this server`)
    })
}