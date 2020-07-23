const Discord = require("discord.js");

exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('#1da1f2')
        .setTimestamp()
        .setFooter(`Collabina - by GlitchyPSI`);

    embed.setTitle('ℹ About')
        .setThumbnail(client.user.displayAvatarURL())
        .addField('API Latency', `${Math.round(client.ws.ping)}ms`)
        .addField('Version', client.version, true)
        .addField('Credits', "<< Built with Enmap >>\nEvie & co. (Enmap)", true)
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "about",
    category: "Information",
    description: "Shows information about the bot, and a few credits.",
    usage: "about"
};