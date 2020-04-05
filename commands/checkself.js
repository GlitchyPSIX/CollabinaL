const funcs = require("../modules/collabFunctions.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    const userSubmission = client.getSubmissions(message.guild, message.author);
    if (userSubmission.timestamp === 0) return message.channel.send(`ℹ ${message.author} YOU haven't submitted yet!`);
    let submissionStatus;

    switch (userSubmission.status) {
        case 0:
            submissionStatus = "🔍 Unreviewed";
            break;
        case 1:
            submissionStatus = "✅ Accepted";
            break;
        case 2:
            submissionStatus = "❎ Denied";
            break;
    }

    let embed = await funcs.submissionInfoEmbed(userSubmission, message.author, false);
    message.channel.send(message.author, embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["own", "self", "me"],
    permLevel: 1
};

exports.help = {
    name: "checkself",
    category: "Collab (Users)",
    description: "Checks your own submission",
    usage: "checkself"
};