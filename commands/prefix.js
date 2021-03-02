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
            let prefix = args[0];
            if (!prefix) {
                let e2 = new MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Please make sure to input a prefix.`)
                    .setTimestamp()
                message.channel.send(e2).then(msg => msg.delete({ timeout: 250000 }));
            } else {
                connection.query(`UPDATE servers SET prefix = '${prefix}' WHERE guild = '${message.guild.id}'`)
                let e3 = new MessageEmbed()
                    .setDescription(`I have updated the prefix to \`${prefix}\``)
                    .setColor(embedcolor)
                    .setFooter(`Action done by ${message.author.tag}`)
                message.channel.send(e3)
            }
        }
    })

}

module.exports.help = {
    name: "changeprefix",
    category: "prefix",
    aliases: ['prefix change']
};