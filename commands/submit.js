const funcs = require("../modules/collabFunctions.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const userSubmission = client.getSubmissions(message.guild, message.author);
    const submissionsEnabled = client.getSettings(message.guild).acceptingSubmissions;
    if (!args || args.length < 1) return message.reply(":x: You may have forgotten the URL.\nCorrect command usage is ``s.submit <url> <description>``");
    if (userSubmission.timestamp == 0 && !submissionsEnabled) return message.channel.send("⚠ Submissions for this collab are currently closed! You can only edit your submission right now.");
    let currentSubmission = {
        "url": args[0],
        "description": args.slice(1).join(" ") || "<No description provided>",
        "timestamp": 0,
        "status": 0,
        "modMessage": ""
    }
    currentSubmission.timestamp = Date.now();
    funcs.sendToLogChannel(userSubmission.timestamp == 0 ? "🔼" : "🖊", `${message.author} has ${userSubmission.timestamp == 0 ? "submitted" : "edited their submission"}\nURL: <${currentSubmission.url}>\nDescription: ${currentSubmission.description}`, message.guild, client);
    client.submissions.set(`${message.guild.id}-${message.author.id}`, currentSubmission);
    let embed = await funcs.submissionInfoEmbed(client.getSubmissions(message.guild, message.author), message.author, false);
    message.reply(`you have successfully ${userSubmission.timestamp == 0 ? "submitted" : "edited your submission"} to this server's collab.`, embed);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: "submit",
    category: "Collab (Users)",
    shortdesc: "Submits an entry, or edits your entry.",
    description: "Submits an entry. If you already submitted, it will edit your entry.\n[URL] = The URL where your entry is in. Can be a Google Drive link, Youtube (preferred) or another media. You may risk getting denied if we can't access it or if it's not a video link.\n<description> = Any extra details you may want to add to this entry, such as credits or instructions.",
    usage: "submit [URL] <description>"
};