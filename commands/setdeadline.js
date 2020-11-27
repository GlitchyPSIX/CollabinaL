const funcs = require("../modules/collabFunctions.js");
const moment = require('moment-timezone');
exports.run = async(client, message, args) => {
    if (args[0] == undefined || args.length < 1) return message.reply("No date!");

    let setDate;
    let timezoneOffset = client.getSettings(message.guild).timezoneOffset;

    switch (args[0].toLowerCase()) {
        case "offset":
            if (args[1] == undefined) return message.reply("No date!");
            setDate = await setDateOffset(args.slice(1).join(""));
            break;
        case "target":
            if (args[1] == undefined) return message.reply("No date!");
            setDate = moment.tz(args.slice(1).join(" "), "DD/MMM/YYYY hh:mma", true, timezoneOffset) || false;
            break;
        case "infinite":
            setDate = 0;
            break;
        default:
            return await message.reply("Invalid type. Only ``offset/target/infinite`` allowed.");
    }
    if (setDate != 0 && setDate.isValid()) {
        if (moment.tz.zone(timezoneOffset)) {
            setDate.tz(timezoneOffset);
        }
    }

    let whetherToAnnounce = await client.awaitReply(message, "Do you wish to announce this?\nWrite ``yes`` within the next 10 seconds to do so.", 10000);

    if (setDate === 0) {
        funcs.sendToLogChannel("🕔", `${message.author.tag} has **changed the deadline for the collab!**\nIt is now **infinity!**`, message.guild, client);
        if (whetherToAnnounce == "yes") {
            funcs.sendToAnnouncementChannel("🕔", `**The deadline for the collab has changed! It is now...\nindefinite (No deadline set)!**`, message.guild, client);
        }
        await client.settings.set(message.guild.id, setDate, "deadline");
        await message.reply(`Success. Deadline is now non-existent.`);
    } else if (setDate.isValid()) {
        funcs.sendToLogChannel("🕔", `${message.author.tag} has **changed the deadline for the collab!**\nIt is now **${setDate.format("DD/MMM/YYYY hh:mm:ssa z")}!**`, message.guild, client);
        await client.settings.set(message.guild.id, setDate, "deadline");
        if (whetherToAnnounce == "announce") {
            funcs.sendToAnnouncementChannel("🕔", `**The deadline for the collab has changed! It is now...\n${setDate.format("DD/MMM/YYYY hh:mm:ssa z")}!**`, message.guild, client);
        }
        await message.reply(`Success. New deadline is now:\n${setDate.format("DD/MMM/YYYY hh:mm:ssa z")}`);
    } else {
        message.reply("Invalid date.\nPlease check you've done the right date format. (``2 digit day``/``3 letter month``/``Full year`` ``12h hours``:``minutes````am/pm``)");
    }

};

function setDateOffset(dateString, offset) {
    let findType = new RegExp(/(\d*)([A-z]{1})/).exec(dateString);
    if (isNaN(findType[1])) {
        return false;
    }
    let date = moment().utc().add(findType[1], findType[2]);
    return date;
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["deadline"],
    permLevel: 3
};

exports.help = {
    name: "setdeadline",
    category: "Collab (Admin)",
    shortdesc: "Sets the deadline for the collab.",
    description: "Sets the deadline for the collab.\n[type] = The deadline type:\n\n* infinite: No deadline set\n\n* target: Set deadline to specific date (DD/MM/YYYY hh:mm:am/pm)\n\n* offset: Set target to a specific time X after inputting the command, where X is:\n* d = days, w = weeks, M = months, m = minutes, h = hours",
    usage: "setdeadline [type] [value]"
};