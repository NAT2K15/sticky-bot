const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
module.exports = async(client, guild, message) => {
    // This event triggers when the bot joins a guild.
    let server = guild;

    console.log(`New guild joined: ${server.name} (id: ${server.id}). This guild has ${server.memberCount} members! ${server.owner.user.username}`);
    //sql below
    connection.query(`INSERT INTO servers SET guild = '${server.id}'`); //ticket


    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function isServerPartneredOrVerified(g) {
        if (g.partnered) return 'Yes';
        if (g.verified) return 'Yes';
        return 'No';
    }
    let channel = client.channels.cache.get(config.guild.main_servers);
    console.log(`${guild.name} || ${guild.id} Guild Joined`)
    let joinembed = new MessageEmbed()
        .setAuthor(`${client.user.tag} Has just joined a server`)
        .addField(`Server:`, `${server.id} || ${server.name}`)
        .addFields({ name: 'Guild ID:', value: `\`\`\`${server.id}\`\`\`` }, { name: 'Owner:', value: `\`\`\`${server.owner.user.username}\`\`\``, inline: true }, { name: 'Creation Date:', value: `\`\`\`${server.createdAt.toLocaleString()}\`\`\``, inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Verification:', value: `\`\`\`${capitalizeFirstLetter(server.verificationLevel)}\`\`\``, inline: true }, { name: 'Content Filter:', value: `\`\`\`${capitalizeFirstLetter(server.explicitContentFilter.replace(/_/g, " "))}\`\`\``, inline: true }, { name: 'Partnerd or Verified:', value: `\`\`\`${isServerPartneredOrVerified(server)}\`\`\``, inline: true }, { name: 'Guild Region:', value: `\`${capitalizeFirstLetter(server.region)}\``, inline: true }, { name: 'Boosters:', value: `\`${server.premiumSubscriptionCount}\``, inline: true }, { name: 'Guild Boost Tier:', value: `\`${server.premiumTier}\``, inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Text Channels:', value: `\`\`\`${server.channels.cache.filter((c) => c.type === "text").size}\`\`\``, inline: true }, { name: 'Voice Channels:', value: `\`\`\`${server.channels.cache.filter((c) => c.type === "voice").size}\`\`\``, inline: true }, { name: 'Categories:', value: `\`\`\`${server.channels.cache.filter((c) => c.type === "category").size}\`\`\``, inline: true }, { name: 'Roles:', value: `\`\`\`${server.roles.cache.size || '0'}\`\`\``, inline: true }, { name: 'Emojis:', value: `\`\`\`${server.emojis.cache.size || '0'}\`\`\``, inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Members:', value: `\`\`\`${server.members.cache.filter(member => !member.user.bot).size}\`\`\``, inline: true }, { name: 'Bots:', value: `\`\`\`${server.members.cache.filter(member => member.user.bot).size}\`\`\``, inline: true }, { name: 'Offline:', value: `\`\`\`${server.members.cache.filter(m => m.presence.status === 'offline').size}\`\`\``, inline: true }, { name: 'Online:', value: `\`\`\`py\n${server.members.cache.filter(m => m.presence.status === 'online').size}. \`\`\``, inline: true }, { name: 'Idle:', value: `\`\`\`fix\n${server.members.cache.filter(m => m.presence.status === 'idle').size}. \`\`\``, inline: true }, { name: 'Do Not Disturb:', value: `\`\`\`md\n${server.members.cache.filter(m => m.presence.status === 'dnd').size}. \`\`\``, inline: true }, )
        .setTimestamp()
        .setColor('GREEN');
    channel.send(joinembed).catch(err => {
        if (err) console.log(client.evente1 + ` Guild: ${server.id} Guild Name: ${server.name} Guild Owner: ${server.owner.user.username}\x1b[0m`)
    })
    setInterval(() => client.user.setActivity(` ${client.prefix}help | Tickets`, { type: "WATCHING" }), 5000)
    if (server.owner.user.id === '563834545128865823' || server.owner.user.id === '121928183531569153' || server.owner.user.id === '632289810035507211') {
        let e1 = new MessageEmbed()
            .setTitle(`Server Error!`)
            .setColor(config.embed.color)
            .setDescription(`You are not allowed to use this bot. It seems like you have been blacklisted. If you feel this is wrong please contact NAT2K15#2951`)
            .addField(`Support Server`, `[CLICK HERE](https://discord.gg/RquDVTfDwu)`)
            .addField(`Error Code`, `ER2`)
            .setFooter(`Made by NAT2K15`)
        server.owner.user.send(e1).catch(e => {
            if (e) console.log(`I was not able to send a dm to the blacklisted user. ${server.owner.user.username}`)
        })
        server.leave()
    }
}