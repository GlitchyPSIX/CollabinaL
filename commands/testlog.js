const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => {
    funcs.sendToLogChannel(args[0], args.slice(1).join(" "), message.guild, client)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 4
};

exports.help = {
    name: "testlog",
    category: "Management",
    description: "Tests the log channel.",
    usage: "testlog <emoji for icon> <text>"
};