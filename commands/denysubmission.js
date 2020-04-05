const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
        const pingedName = message.guild.members.get(args[0]) || message.mentions.members.first();
        if (!args || args.length < 1 || pingedName === undefined) return message.reply(":x: Could not find this user in this server.\nUse an ID or mention.");
        let userSubmission = client.getSubmissions(message.guild, pingedName.user);
        if (userSubmission.timestamp === 0) return message.reply("ℹ This user hasn't submitted yet!");

        let denyReason = args.slice(1).join(" ");

        switch (userSubmission.status) {
            case 1:
                return message.channel.send(":confused: This user's submission has been already accepted...\nDid you mean ``reconsider``?");
            case 2:
                return message.channel.send(":confused: This user's current submission has been denied already.");
        }

        client.submissions.set(`${message.guild.id}-${pingedName.user.id}`, 2, "status");

        if (args[1]) client.submissions.setProp(`${message.guild.id}-${pingedName.user.id}`, "denyReason", denyReason);

        userSubmission = client.getSubmissions(message.guild, pingedName.user);

        if (userSubmission.status == 2) {
            funcs.sendToLogChannel("❌", `${message.author.tag} has **denied** ${pingedName.user}'s submission.\n${args[1] ? `The reason is: ${denyReason}` : "**No reason provided.**"}`, message.guild, client);
            await message.channel.send(`:white_check_mark: Successfully denied ${pingedName.user.tag}'s submission\n${args[1] ? `Your reason is: ${denyReason}` : "...but you didn't provide a reason. They may start asking." }`);
        pingedName.user.send(`😮 Oh! Looks like your submission in **${message.guild.name}** has been denied...\n${args[1] ? `The reason is: ${denyReason}` : "Huh. They may have not provided a reason here. Maybe ask the mods?"}`);
    }
    else {
        message.channel.send("Something went wrong and I have no idea what.");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["deny"],
    permLevel: 2
};

exports.help = {
    name: "denysubmission",
    category: "Collab (Moderators)",
    description: "Denies a submission. You should provide a reason.",
    usage: "deny <user mention/user ID> <reason>"
};