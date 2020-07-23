const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const pingedName = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!args || args.length < 1 || pingedName === undefined) return message.reply(":x: Could not find this user in this server.\nUse an ID or mention.");
    let userSubmission = client.getSubmissions(message.guild, pingedName.user);
    if (userSubmission.timestamp === 0) return message.reply("ℹ This user hasn't submitted yet!");

    switch (userSubmission.status) {
        case 1:
            return message.channel.send(":confused: This user's submission has been already accepted.");
        case 2:
            return message.channel.send(":confused: This user's current submission has been denied...\nDid you mean ``reconsider``?");
    }
    await client.submissions.set(`${message.guild.id}-${pingedName.user.id}`, 1, "status")
    userSubmission = client.getSubmissions(message.guild, pingedName.user);
    if (userSubmission.status == 1) {
        funcs.sendToLogChannel("✅", `${message.author.tag} has **accepted** ${pingedName.user}'s submission.`, message.guild, client);
        await message.channel.send(`:white_check_mark: Successfully accepted ${pingedName.user.tag}'s submission!`);
        pingedName.user.send(`:tada: Congratulations! Your submission in **${message.guild.name}** has been accepted!`)
    } else {
        message.channel.send("Something went wrong and I have no idea what.");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["accept"],
    permLevel: 2
};

exports.help = {
    name: "acceptsubmission",
    category: "Collab (Moderators)",
    description: "Accepts a submission",
    usage: "accept <user mention/user ID>"
};