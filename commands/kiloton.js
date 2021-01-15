const Discord = require("discord.js");
const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    let messageReply = await client.awaitReply(message, `💣 ARE YOU **SURE** YOU WANT TO WIPE EVERY ENTRY?\n***\`\`THIS CANNOT BE UNDONE.\`\`*** To do it, reply "karraput" within the next 10 seconds.`, 10000);

    if (messageReply === "karraput") {
        let msg = await message.channel.send("This might take a bit. Hold on tight.");
        let submissionKeyArray = client.submissions.indexes.filter(x => {return x.startsWith(message.guild.id)});
        submissionKeyArray.forEach(x => {
            client.submissions.delete(x);
        });
        funcs.sendToLogChannel("☢", `${message.author.tag} has **nuked *every*** submission.`, message.guild, client);
        await msg.edit("https://tenor.com/ysMW.gif");
        
    } else {
        await message.channel.send("💧 Guess everything stays the same.");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kt", "deleteall", "wipe"],
    permLevel: 4
};

exports.help = {
    name: "kiloton",
    category: "Collab (Admin)",
    shortdesc: "Nukes ALL submissions. Only the owner / bot owner can do this.",
    description: "Nukes ALL submissions. Deletes them all entirely. Poof. Karraput.\nEven though the bot owner can also use this command, it won't be used by them unless intervention is required.",
    usage: "kiloton"
};