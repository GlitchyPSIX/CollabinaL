const funcs = require("../modules/collabFunctions.js");
const moment = require('moment-timezone');
exports.run = async(client, message, args) => {
    if (args[0] == undefined || args.length < 1) return message.reply("No timezone!");

    timezone = await moment.tz.zone(args.join("_"));

    if (timezone == null) {
        return await message.reply("Invalid timezone.\nPlease check you've used a correct timezone name. <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>");
    } else {
        funcs.sendToLogChannel("🌐", `${message.author.tag} has **changed the timezone for the server!**\nIt is now **${timezone.name}!**`, message.guild, client);
        await client.settings.set(message.guild.id, timezone.name, "timezoneOffset");
        await message.reply(`Success. New timezone is now:\n${timezone.name}`);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["timezone", "tz"],
    permLevel: 3
};

exports.help = {
    name: "settimezone",
    category: "Collab (Admin)",
    shortdesc: "Sets the timezone for the server.",
    description: "Sets the timezone for the server.\n[timezone] = Timezone to set the server to.\nYou can find a list of valid timezone names in <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>.",
    usage: "settimezone [type]"
};