const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => {
    if (args[0] == undefined) return message.reply("You forgot to specify the role name!");
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => {
        return x.name == args.join(" ")
    });
    if (role != undefined) {
        client.settings.set(message.guild.id, role.id, "canSubmitRole");
        await message.reply(`Current submission role:\n\`\`\`${role.name}\`\`\``);
    } else {
        message.reply("Could not find this role!");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["subrole", "setsubmitter"],
    permLevel: 3
};

exports.help = {
    name: "setsubmissionrole",
    category: "Management",
    description: "Sets the role that allows people to submit.",
    usage: "setsubmissionrole <role name>"
};