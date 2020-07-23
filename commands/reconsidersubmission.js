const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const pingedName = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!args || args.length < 1 || pingedName === undefined) return message.reply(":x: Could not find this user in this server.\nUse an ID or mention.");
    let userSubmission = client.getSubmissions(message.guild, pingedName.user);
    if (userSubmission.timestamp === 0) return message.reply("ℹ This user hasn't submitted yet!");

    if (userSubmission.status == 0) {
        return message.channel.send(":confused: No verdict has been passed on this user's submission.");
    }
    client.submissions.setProp(`${message.guild.id}-${pingedName.user.id}`, "status", 0);
    userSubmission = client.getSubmissions(message.guild, pingedName.user);

    if (userSubmission.status == 0) {
        funcs.sendToLogChannel("🔍", `${message.author.tag} has **set** ${pingedName.user}'s submission under review status again.`, message.guild, client);
        await message.channel.send(`:white_check_mark: Successfully unmarked ${pingedName.user.tag}'s submission!`);
        pingedName.user.send(`🔍 Hey! Looks like your submission in **${message.guild.name}** has been put into consideration again.`)
    } else {
        message.channel.send("Something went wrong and I have no idea what.");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["reconsider"],
    permLevel: 2
};

exports.help = {
    name: "reconsidersubmission",
    category: "Collab (Moderators)",
    description: "Reconsiders a submission, setting its status back to \"Unreviewed\"",
    shortdesc: "Sets a submission's status back to \"Unreviewed\"",
    usage: "reconsider <user mention/user ID>"
};