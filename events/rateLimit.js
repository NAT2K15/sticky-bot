const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = async(client, info) => {
    console.log(info)
    console.log(`[RATE LIMIT] Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout: 'Unknown timeout '}`)
}