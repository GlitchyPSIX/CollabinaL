const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const pingedName = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!args || args.length < 1 || pingedName === undefined) return message.reply(":x: Could not find this user in this server.\nUse an ID or mention.");
    const userSubmission = client.getSubmissions(message.guild, pingedName.user);
    if (userSubmission.timestamp === 0) return message.reply("ℹ This user hasn't submitted yet!");

    let dmUser = args[1] ? args[1].toLower() == "no" : true;

    let messageReply = await client.awaitReply(message, `💣 ARE YOU **SURE** YOU WANT TO NUKE **${pingedName.user.tag}'s** SUBMISSION?\n***\`\`THIS CANNOT BE UNDONE.\`\`*** To do it, reply "kaput" within the next 10 seconds.`, 10000);

    if (messageReply === "kaput") {
        funcs.sendToLogChannel("☢", `${message.author.tag} has **nuked** ${pingedName.user}'s submission.`, message.guild, client);
        await message.channel.send("🧨💥 Boom. Submission's gooooone.");
        pingedName.user.send(`:warning: Your submission in **${message.guild.name}** has been nuked by a moderator.\nYou need to resubmit an entry if you still want to participate.`)
        await client.submissions.delete(`${message.guild.id}-${pingedName.user.id}`);
    } else {
        await message.channel.send("💧 Guess nothing's exploding, then.");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["nuke"],
    permLevel: 3
};

exports.help = {
    name: "nukesubmission",
    category: "Collab (Admin)",
    shortdesc: "Nukes a submission. Deletes it. Kaput. No coming back.",
    description: "Nukes a submission. Deletes it entirely. Poof. Kaput. No coming back.\nAlso the sound is so loud the person who submitted will also know unless you silence it.\n<dm person> = Whether to DM the person that submitted this entry. Defaults to yes. Only accepts \"no\" as negative answer.",
    usage: "nuke <user mention/user ID> <dm person>"
};