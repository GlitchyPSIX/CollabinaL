const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const pingedName = message.guild.members.get(args[0]) || message.mentions.members.first();
    if (!args || args.length < 1 || pingedName === undefined) return message.reply(":x: Could not find this user in this server.\nUse an ID or mention.");
    let userSubmission = client.getSubmissions(message.guild, pingedName.user);
    if (userSubmission.timestamp === 0) return message.reply("ℹ This user hasn't submitted yet!");

    let modnote = args.slice(1).join(" ");

    if (args[1]) {
        funcs.sendToLogChannel("📄", `${message.author.tag} has added a modnote to ${pingedName.user}'s submission.\nContents: ${modnote}`, message.guild, client);
        await client.submissions.setProp(`${message.guild.id}-${pingedName.user.id}`, "modMessage", modnote);
        userSubmission = client.getSubmissions(message.guild, pingedName.user);
        await message.channel.send(`:pencil: Added the modnote to ${pingedName.user.tag}'s submission\nNote: ${modnote}`);
    } else {
        await message.channel.send(`:pencil: Nothing changed.`);
    }



};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["note"],
    permLevel: 2
};

exports.help = {
    name: "modnote",
    category: "Collab (Moderators)",
    description: "Adds/edits the modnote of a submission",
    usage: "deny <user mention/user ID> <note>"
};