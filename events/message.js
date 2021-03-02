const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const fs = require('fs');
module.exports = async(client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    connection.query(`SELECT * FROM servers WHERE guild = '${message.guild.id}'`, async function(err, reslove) {
        let prefix = `${reslove[0].prefix}`;
        let color = `${reslove[0].embedcolor}`
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase();
        let args = messageArray.slice(1);
        if (message.mentions.members.first()) {
            if (!message.content.includes(` `) && message.mentions.members.first().id == client.user.id) {
                try {
                    let e1 = new MessageEmbed()
                        .setDescription(`My Current prefix is \`${prefix}\` If you would like to invite this bot to your server use \`${prefix}invite\``)
                        .setColor(color)
                    message.channel.send(e1)
                } catch (e) {
                    console.log(e);
                }
            }
        }
        if (!message.content.startsWith(prefix)) {
            connection.query(`SELECT * FROM guilds WHERE guild = '${message.guild.id}' AND channel = '${message.channel.id}'`, async function(err, reslove) {

                if (reslove[0].num >= 5) {
                    let channels = message.guild.channels.cache.filter(c => c.type == "text")
                    channels.forEach(async(channel) => {
                        const messagefound = await channel.messages.fetch(reslove[0].lastmsg).catch(e => {})
                        if (messagefound) {
                            messagefound.delete()

                        }
                    })
                    let chan = message.guild.channels.cache.get(reslove[0].channel);
                    if (!chan) return;
                    let newMsg = await message.channel.send(reslove[0].msg)
                    connection.query(`UPDATE guilds SET lastmsg = '${newMsg.id}' WHERE guild = '${message.guild.id}' AND channel = '${reslove[0].channel}'`);
                    connection.query(`UPDATE guilds SET num = '0' WHERE guild = '${message.guild.id}' AND channel = '${reslove[0].channel}'`);
                } else {
                    connection.query(`UPDATE guilds SET num = ${reslove[0].num} + 1 WHERE guild = '${message.guild.id}' AND channel = '${reslove[0].channel}'`);
                }
            })
        };
		 if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(client, message, args);
    });

}