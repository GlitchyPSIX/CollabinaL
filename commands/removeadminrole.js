const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    if (args[0] == undefined) return message.reply("You forgot to specify the role name!");
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => { return x.name == args.join(" ") });
    let rolelist = client.getSettings(message.guild).adminRoles;
    if (role != undefined || role != null) {
        let newlist = funcs.removeRoleFromList(role, rolelist);
        client.settings.set(message.guild.id, newlist, "adminRoles");
        rolelist = client.getSettings(message.guild).adminRoles;
        let rolestrings = rolelist.map(x => { return `${message.guild.roles.cache.get(x).name}` }).join("\n");
        await message.reply(`Current Admin Roles List:\n\`\`\`${rolestrings}\`\`\``);
    } else {
        message.reply("Could not find this role!");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["deladmin"],
    permLevel: 3
};

exports.help = {
    name: "remadmin",
    category: "Management",
    description: "Removes an admin role if it is present.",
    usage: "remadmin <role name>"
};