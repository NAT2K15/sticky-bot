const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
module.exports.run = async(client, message, args) => {
    connection.query(`SELECT * FROM servers WHERE guild = '${message.guild.id}'`, async function(err, reslove) {
        let embedcolor = reslove[0].embedcolor;
        let ping = Date.now() - message.createdTimestamp + " ms";
        let e1 = new MessageEmbed()
            .addField(`Uptime!`, `I've been online for \`${ms(client.uptime, { long: true })}\``)
            .addField(`Ping`, `Latency: ${ping}`)
            .setColor(embedcolor)
        message.channel.send(e1).then(msg => msg.delete({ timeout: 60000 }));
    })
}

module.exports.help = {
    name: "uptime",
    description: "Edit the ticket channel and role in the database",
    usage: "",
    category: "Database",
    aliases: []
};