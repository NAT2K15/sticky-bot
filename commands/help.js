const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    connection.query(`SELECT * FROM servers WHERE guild = '${message.guild.id}'`, async function(err, reslove) {
        let prefix = reslove[0].prefix;
        let e1 = new MessageEmbed()
            .setColor(reslove[0].embedcolor)
            .setTitle(`Help Command ${client.user.tag}`)
            .addField(`${prefix}changecolor`, `Changes the color of the embed in this guild`)
            .addField(`${prefix}changeprefix`, `Changes the prefix of this guild`)
            .addField(`${prefix}stickyadd`, `Adds a sticky to a channel`)
            .addField(`${prefix}stickyremove`, `Removes a sticky from a channel`)
            .addField(`${prefix}uptime`, `Tells you how long the bot has been up for`)
        message.channel.send(e1)
    })
}
module.exports.help = {
    name: "help",
    category: "prefix",
    aliases: ['prefix change']
};