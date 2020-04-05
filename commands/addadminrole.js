const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => {
    if (args[0] == undefined) return message.reply("You forgot to specify the role name!");
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(x => {
        return x.name == args.join(" ")
    });
    let rolelist = client.getSettings(message.guild).adminRoles;
    if (role != undefined) {
        funcs.addRoleToRoleList(role, rolelist);
        client.settings.set(message.guild.id, rolelist, "adminRoles");
        rolelist = client.getSettings(message.guild).adminRoles;
        let rolestrings = rolelist.map(x => {
            return `${message.guild.roles.get(x).name}`
        }).join("\n");
        await message.reply(`Current Admin Roles List:\n\`\`\`${rolestrings}\`\`\``);
    } else {
        message.reply("Could not find this role!");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
};

exports.help = {
    name: "addadmin",
    category: "Management",
    description: "Adds an admin role if it isn't present.",
    usage: "addadmin <role name>"
};