const { MessageEmbed } = require('discord.js')
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
                    .setColor(embedcolor)
                    .setDescription(`Please make sure to input a vaild channel. Example: \`${reslove[0].prefix}${module.exports.help.name} <#channel> (message)\``)
                message.channel.send(e2).then(msg => msg.delete({ timeout: 25000 }));
            } else {
                let msg = args.slice(1).join(` `);
                if (!msg) {
                    let e3 = new MessageEmbed()
                        .setDescription(`Please make sure to input a vaild sticky message. Example: \`${reslove[0].prefix}${module.exports.help.name} <#channel> (message)\``)
                        .setColor(embedcolor)
                    message.channel.send(e3).then(msg => msg.delete({ timeout: 25000 }));
                } else {
                    connection.query(`SELECT * FROM guilds WHERE guild = '${message.guild.id}'`, async function(e1, r1) {
                        if (r1[0] === undefined || r1[0].channel == message.channel.id) {
                            connection.query(`DELETE FROM guilds WHERE guild = '${message.guild.id}' AND channel = '${channel.id}'`);

                            let msgg = await channel.send(`${msg}`).catch(e => {
                                if (e) return console.log(`I had an issue in line 32 at stickyadd`)
                            })
                            connection.query(`INSERT INTO guilds SET guild = '${message.guild.id}', channel = '${channel.id}', channelname = '${channel.name}', msg = '${msg}', lastmsg = '${msgg.id}'`);
                            let e4 = new MessageEmbed()
                                .setDescription(`I have updated the sticky database!`)
                                .addField(`Channel`, channel)
                                .addField(`Message`, msg)
                                .setColor(embedcolor)
                            message.channel.send(e4)
                        } else {
                            connection.query(`DELETE FROM guilds WHERE guild = '${message.guild.id}' AND channel = '${channel.id}'`);
                            connection.query(`INSERT INTO guilds SET guild = '${message.guild.id}', channel = '${channel.id}', channelname = '${channel.name}', msg = '${msg}'`);
                            channel.send(`${msg}`).catch(e => {
                                if (e) return console.log(`I had an issue in line 32 at stickyadd`)
                            })
                            let e4 = new MessageEmbed()
                                .setDescription(`I have updated the sticky database!`)
                                .addField(`Channel`, channel)
                                .addField(`Message`, msg)
                                .setColor(embedcolor)
                            message.channel.send(e4)
                        }
                    })
                }
            }
        }
    })
}

module.exports.help = {
    name: "stickyadd",
    category: "sticky",
    aliases: ['Sticky']
};