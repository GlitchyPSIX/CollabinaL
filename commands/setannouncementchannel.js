const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => {
    if (args[0] == undefined) return message.reply("You forgot to specify the role name!");
    let channel = message.mentions.channels.first() || message.guild.channels.get(args[0])
    if (channel != undefined) {
        client.settings.set(message.guild.id, channel.id, "announcementChannel");
        await message.reply(`Current log channel:\n\`\`\`${channel.name}\`\`\``);
    } else {
        message.reply("Could not find this channel!");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["setannouncements"],
    permLevel: 3
};

exports.help = {
    name: "setannouncementchannel",
    category: "Management",
    description: "Sets the announcement channel for this server",
    usage: "setannouncementchannel <channel ID or mention>"
};