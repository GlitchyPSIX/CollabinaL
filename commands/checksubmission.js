const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const pingedName = await message.guild.members.get(args[0]) || message.mentions.members.first();
    if (!args || args.length < 1 || pingedName === undefined) return message.reply(":x: Could not find this user in this server.\nUse an ID or mention.");
    const userSubmission = await client.getSubmissions(message.guild, pingedName.user);
    if (userSubmission.timestamp === 0) return message.reply("ℹ This user hasn't submitted yet!");

    let embed = await funcs.submissionInfoEmbed(userSubmission, pingedName.user);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["check"],
    permLevel: 2
};

exports.help = {
    name: "checksubmission",
    category: "Collab (Moderators)",
    description: "Checks a submission",
    usage: "submit <user mention/user ID>"
};