const funcs = require("../modules/collabFunctions.js");
const Discord = require("discord.js");
exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    // if the first argument is D then we should also include all denied submissions
    let includeDenied = (args[0] === "D");
    await message.reply("Wait a moment. Generating text file with submissions...");
    let subs = await client.getGuildSubmissions(message.guild, includeDenied);
    if (subs.length < 1){
        return message.reply("⚠ There are no submissions in this server!");
    }
    let alltext = "";
    subs.map(x => {
        alltext += `${getFormattedSubmissionInfo(x)}\n`;
    })
    // the text file containing all submissions that matched the criteria
    let attach = new Discord.MessageAttachment(Buffer.from(alltext, "utf8"), "submissions.txt");
    await message.channel.send("Here's your submissions.", attach);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["list", "ls"],
    permLevel: 3
};

exports.help = {
    name: "listsubmissions",
    category: "Collab (Admin)",
    shortdesc: "Lists all submissions for the server.",
    description: "Lists all submissions for the server. Optionally, add a D at the end of the command to include denied submissions.",
    usage: "listsubmissions <D>"
};

function getFormattedSubmissionInfo(submission){
    let text = `-----------------\nSUBMISSION: ${getStatusString(submission.status)}` +
    `\nBy: ${submission.user}` +
    `\nDate submitted: ${new Date(submission.timestamp).toDateString()}` + 
    `\nURL: ${submission.url}` + 
    `\nUser note: ${submission.description}`;
    if (submission.modMessage != ""){
        text += `\nMod note: ${submission.modMessage}`;
    }
    if (submission.denyReason != null && submission.status == 2){
        text += `\nDenial reason: ${submission.denyReason}`;
    }
    text += "\n-----------------";
    return text;
}

function getStatusString(id) {
    let submissionStatus = "Unknown";
    switch(id){
    case 0:
        submissionStatus = "Unreviewed";
        break;
    case 1:
        submissionStatus = "Accepted";
        break;
    case 2:
        submissionStatus = "Denied";
        break;
    }
    return submissionStatus;
}