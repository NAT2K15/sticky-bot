const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, message, args) => {

    let e1 = new MessageEmbed()
        .addField(`Bot invite`, `[CLICK HERE](${config.invite})`)
        .addField(`Support server`, `https://discord.gg/RquDVTfDwu`)
        .setFooter(`Made by NAT2K15`, `https://cdn.discordapp.com/avatars/576971985108860929/a_9fbe3fbc2f827cd6b7f6126f1479a0a7.gif?size=1024`)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor('BLACK')
    message.channel.send(e1).then(msg => msg.delete({ timeout: 60000 }));
}

module.exports.help = {
    name: "invite",
    description: "Edit the ticket channel and role in the database",
    usage: "",
    category: "Database",
    aliases: []
};