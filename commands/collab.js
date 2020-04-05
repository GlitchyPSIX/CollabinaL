const funcs = require("../modules/collabFunctions.js");
const Discord = require("discord.js");
const moment = require('moment-timezone');

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    let serverSettings = client.getSettings(message.guild);
    let embed = new Discord.RichEmbed()
        .setTitle(`Collab information for ${message.guild.name}`)
        .addField("Deadline", serverSettings.deadline == 0 ? "No deadline!" : moment.tz(serverSettings.deadline, serverSettings.timezoneOffset).format("DD/MMM/YYYY hh:mm:ssa z"))
        .addField("Server timezone", serverSettings.timezoneOffset)
        .addField("Accepting submissions?", serverSettings.acceptingSubmissions ? "Yes" : "No");
    message.channel.send(message.author, embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["info", "ci"],
    permLevel: 1
};

exports.help = {
    name: "collab",
    category: "Collab (Users)",
    description: "Shows information about the ongoing collab.",
    usage: "collab"
};