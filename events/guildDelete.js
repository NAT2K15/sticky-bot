const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = async(client, guild) => {
    var server = guild;
    connection.query(`DELETE FROM servers WHERE guild = "${server.id}"`); //ticket

    setInterval(() => client.user.setActivity(` ${client.prefix}help | Tickets`, { type: "WATCHING" }), 5000)

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function isServerPartneredOrVerified(g) {
        if (g.partnered) return 'Yes';
        if (g.verified) return 'Yes';
        return 'No';
    }
    let channel = client.channels.cache.get(config.guild.main_servers);

    console.log(`${guild.name} || ${guild.id} Guild Left`)
    let leaveembed = new MessageEmbed()
        .setAuthor(`${client.user.tag} Has just left a server`)
        .addField(`Server:`, `${server.id} || ${server.name}`)
        .addFields({ name: 'Guild ID:', value: `\`\`\`${server.id}\`\`\`` }, { name: 'Owner:', value: `\`\`\`${server.owner.user.username}\`\`\``, inline: true }, { name: 'Creation Date:', value: `\`\`\`${server.createdAt.toLocaleString()}\`\`\``, inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Verification:', value: `\`\`\`${capitalizeFirstLetter(server.verificationLevel)}\`\`\``, inline: true }, { name: 'Content Filter:', value: `\`\`\`${capitalizeFirstLetter(server.explicitContentFilter.replace(/_/g, " "))}\`\`\``, inline: true }, { name: 'Partnerd or Verified:', value: `\`\`\`${isServerPartneredOrVerified(server)}\`\`\``, inline: true }, { name: 'Guild Region:', value: `\`${capitalizeFirstLetter(server.region)}\``, inline: true }, { name: 'Boosters:', value: `\`${server.premiumSubscriptionCount}\``, inline: true }, { name: 'Guild Boost Tier:', value: `\`${server.premiumTier}\``, inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Text Channels:', value: `\`\`\`${server.channels.cache.filter((c) => c.type === "text").size}\`\`\``, inline: true }, { name: 'Voice Channels:', value: `\`\`\`${server.channels.cache.filter((c) => c.type === "voice").size}\`\`\``, inline: true }, { name: 'Categories:', value: `\`\`\`${server.channels.cache.filter((c) => c.type === "category").size}\`\`\``, inline: true }, { name: 'Roles:', value: `\`\`\`${server.roles.cache.size || '0'}\`\`\``, inline: true }, { name: 'Emojis:', value: `\`\`\`${server.emojis.cache.size || '0'}\`\`\``, inline: true }, { name: '\u200B', value: '\u200B' }, { name: 'Members:', value: `\`\`\`${server.members.cache.filter(member => !member.user.bot).size}\`\`\``, inline: true }, { name: 'Bots:', value: `\`\`\`${server.members.cache.filter(member => member.user.bot).size}\`\`\``, inline: true }, { name: 'Offline:', value: `\`\`\`${server.members.cache.filter(m => m.presence.status === 'offline').size}\`\`\``, inline: true }, { name: 'Online:', value: `\`\`\`py\n${server.members.cache.filter(m => m.presence.status === 'online').size}. \`\`\``, inline: true }, { name: 'Idle:', value: `\`\`\`fix\n${server.members.cache.filter(m => m.presence.status === 'idle').size}. \`\`\``, inline: true }, { name: 'Do Not Disturb:', value: `\`\`\`md\n${server.members.cache.filter(m => m.presence.status === 'dnd').size}. \`\`\``, inline: true }, )
        .setTimestamp()
        .setColor('RED');
    channel.send(leaveembed)

};