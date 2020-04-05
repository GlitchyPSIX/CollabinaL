require('dotenv').config();
module.exports = (client, message) => {

    var botPrefix = process.env.PREFIX || "s."

    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix
    if (message.content.indexOf(botPrefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(botPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    if (!(client.permlevel(message) >= cmd.conf.permLevel)) { console.log(`A user with permission level ${client.permlevel(message)} tried to run command with permission lv ${cmd.conf.permLevel}`); return };

    // Run the command
    cmd.run(client, message, args);

};