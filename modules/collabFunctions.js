const Discord = require("discord.js");

// Creates a submission info embed.
exports.submissionInfoEmbed = async(submission, submissionUser, includeModnote = true) => {
    let embed = new Discord.MessageEmbed();
    let submissionStatus;

    switch (submission.status) {
        case 0:
            submissionStatus = "🔍 Unreviewed";
            break;
        case 1:
            submissionStatus = "✅ Accepted";
            break;
        case 2:
            submissionStatus = "❎ Denied";
            break;
    }
    embed.setTitle(`Submission data for ${submissionUser.tag}`)
        .addField("Submission time", `${new Date(submission.timestamp).toDateString()}`, true)
        .addField("Submission status", submissionStatus, true)
        .addField("URL", submission.url, false)
        .addField("User notes", submission.description, true)
    if (includeModnote)
        embed.addField("Moderator notes", submission.modMessage || "<No notes present>", false);
    if (submission.status == 2) {
        embed.addField("Reason for denial", submission.denyReason || "<no reason provided>", false)
    }
    return embed;
}

exports.addRoleToRoleList = (role, list) => {
    if (!list.includes(role.id)) {
        list.push(role.id);
    }
}

exports.removeRoleFromList = (role, list) => {
    var newList = list.filter(x => { return (x != role.id); });
    return newList;
}

/// Sends to log channel. 
/// Icon and message.
exports.sendToLogChannel = (icon, message, guild, client) => {
    let logChannelID = client.getSettings(guild).submissionLogChannel;
    let logChannel = guild.channels.cache.get(logChannelID);

    if (logChannel == undefined) {
        client.logger.log("This server doesn't have a valid log channel set!", "warn");
        return;
    }
    logChannel.send(`${icon} ${message}`);
}


/// Sends to announcements channel. 
/// Icon and message.
exports.sendToAnnouncementChannel = (icon, message, guild, client) => {
    let logChannelID = client.getSettings(guild).announcementChannel;
    let logChannel = guild.channels.cache.get(logChannelID);

    if (logChannel == undefined) {
        client.logger.log("This server doesn't have a valid announcements channel set!", "warn");
        return;
    }
    logChannel.send(`${icon} ${message}`);
}

/// Sets a channel by its ID to a property.
/// Returns true if sucessful.
exports.setupChannel = (property, channelID, message, client) => {
    let guild = message.guild;
    let channel = guild.channels.cache.get(channelID);

    if (channel == undefined) return false;

    client.settings.set(guild.id, channelID, property);
    let setting = client.getSettings(guild)[property];

    if (setting == channel) {
        return true;
    } else {
        return false;
    }
}