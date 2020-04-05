const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const pingedName = message.guild.members.get(args[0]) || message.mentions.members.first();
    let acceptingSubmissions = client.getSettings(message.guild).acceptingSubmissions;
    let messageReply = await client.awaitReply(message, `😮 Do you wish to change the status for submissions for this server?\nCurrently, the server **${acceptingSubmissions ? "is" : "isn't"}** accepting submissions.\nReply one of the following within the next 10 seconds:\n\`\`y\`\` to enable submissions.\n\`\`n\`\` to disable submissions.\n\`\`SY\`\` to enable submissions silently.\n\`\`SN\`\` to disable submissions silently.\n\`\`anything else\`\` or \`\`wait 10 seconds\`\` to cancel.`, 10000);

    switch (messageReply.toLowerCase()) {
        case "y":
            if (acceptingSubmissions) {
                return message.reply("Nothing changed.")
            } else {
                funcs.sendToLogChannel("🎇", `**${message.author.tag} opened the collab's submissions.**`, message.guild, client);
                funcs.sendToAnnouncementChannel("🎇", `**The collab's submissions are now open!!**`, message.guild, client);
                await client.settings.set(message.guild.id, true, "acceptingSubmissions");
                await message.reply("We're set. Submissions have been opened.");
            }
            break;
        case "n":
            if (!acceptingSubmissions) {
                return message.reply("Nothing changed.")
            } else {
                funcs.sendToLogChannel("🎇", `**${message.author.tag} closed the collab's submissions.**`, message.guild, client);
                funcs.sendToAnnouncementChannel("🎇", `**The collab's submissions are now closed!!**`, message.guild, client);
                await client.settings.set(message.guild.id, false, "acceptingSubmissions");
                await message.reply("We're set. Submissions have been closed.");
            }
            break;
        case "sy":
            if (acceptingSubmissions) {
                return message.reply("Nothing changed.")
            } else {
                funcs.sendToLogChannel("🎇", `**${message.author.tag} opened the collab's submissions.**`, message.guild, client);
                await client.settings.set(message.guild.id, true, "acceptingSubmissions");
                await message.reply("We're set. Submissions have been opened. Shhh.");
            }
            break;
        case "sn":
            if (!acceptingSubmissions) {
                return message.reply("Nothing changed.")
            } else {
                funcs.sendToLogChannel("🎇", `**${message.author.tag} closed the collab's submissions.**`, message.guild, client);
                await client.settings.set(message.guild.id, false, "acceptingSubmissions");
                await message.reply("We're set. Submissions have been closed. Shhh.");
            }
            break;
        default:
            await message.channel.send("Nothing changed.");
            break;
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["toggle", "allowsub"],
    permLevel: 3
};

exports.help = {
    name: "togglecollab",
    category: "Collab (Admin)",
    shortdesc: "Changes whether the server is accepting entries or not.",
    description: "Changes whether the server is accepting entries or not. Can be silent. Interactive setup.",
    usage: "togglecollab"
};