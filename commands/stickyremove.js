const { MessageEmbed } = require('discord.js');
const { readSync } = require('fs');
module.exports.run = async(client, message, args) => {
    connection.query(`SELECT * FROM servers WHERE guild = '${message.guild.id}'`, async function(err, reslove) {
        let embedcolor = reslove[0].embedcolor;
        if (!message.member.hasPermission(["ADMINISTRATOR"])) {
            let e1 = new MessageEmbed()
                .setDescription(`You cannot use this command.`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setColor(embedcolor)
            message.channel.send(e1).then(message => message.delete({ timeout: 25000 })).catch(err => {
                if (err) console.log(client.evente7 + ` Guild: ${message.guild.id} Guild Name: ${message.guild.name} Guild Owner: ${message.guild.owner.user.username}\x1b[0m`)
            })
        } else {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!channel) {
                let e2 = new MessageEmbed()
                    .setDescription(`please make sure to input a vaild channel.`)
                    .setColor(embedcolor)
                message.channel.send(e2).then(msg => msg.delete({ timeout: 25000 }));
            } else {
                connection.query(`SELECT * FROM guilds WHERE guild = '${message.guild.id}' AND channel = '${channel.id}'`, async function(errr, reslove) {
                    if (errr) console.log(errr);
                    if (reslove[0] === undefined) {
                        let e3 = new MessageEmbed()
                            .setDescription(`I was not able to find the sticky message for the channel you mentioned`)
                            .setColor(embedcolor)
                        message.channel.send(e3).then(msg => msg.delete({ timeout: 25000 }));
                    } else {
                        connection.query(`DELETE FROM guilds WHERE guild = '${message.guild.id}' AND channel = '${channel.id}'`);
                        let e4 = new MessageEmbed()
                            .setDescription(`I have deleted the sticky message for ${channel}`)
                            .setColor(embedcolor)
                        message.channel.send(e4)
                    }
                })
            }
        }
    })

}

module.exports.help = {
    name: "stickyremove",
    category: "sticky",
    aliases: ['Sticky']
};