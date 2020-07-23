const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    if (args[0] == undefined) return message.reply("You forgot to specify the role name!");
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => { return x.name == args.join(" ") });
    let rolelist = client.getSettings(message.guild).modRoles;
    if (role != undefined || role != null) {
        let newlist = funcs.removeRoleFromList(role, rolelist);
        client.settings.set(message.guild.id, newlist, "modRoles");
        rolelist = client.getSettings(message.guild).modRoles;
        let rolestrings = rolelist.map(x => { return `${message.guild.roles.cache.get(x).name}` }).join("\n");
        await message.reply(`Current Moderator Roles List:\n\`\`\`${rolestrings}\`\`\``);
    } else {
        message.reply("Could not find this role!");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["delmod"],
    permLevel: 3
};

exports.help = {
    name: "remmod",
    category: "Management",
    description: "Removes a mod role if it is present.",
    usage: "remmod <role name>"
};