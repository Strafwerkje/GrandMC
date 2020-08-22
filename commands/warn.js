const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete()
    // {prefix}report speler reden

    var prefix = botConfig.prefix;

    if (!args[0]) return message.channel.send(`Gebruik het command als volgt: ${prefix}warn gebruikersnaam redenen.`)
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Je hebt geen Permissie voor deze command!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Speler is niet te vinden / geef een speler op.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Gelieve een reden op te geven.")

    var reportEmbed = new discord.MessageEmbed()
        .setDescription("u heeft en warn ontvangen.")
        .setColor("ff0000")
        .addField("warn gebruiker", `${user} Door staff op deze Server.  ${message.guild.name}`)
        .addField("gewarnd door", `${message.author} op de Server  ${message.guild.name}`)
        .addField("Reden", reason)
        .setFooter(message.createdAt);

        var channelReport  = message.guild.channels.cache.find(ch => ch.name === "algemeen");
        if (!channelReport) return message.channel.send("Kan het kanaal niet vinden");

    // ZORG VOOR ADMINISTRATOR RECHTEN OP BOT.
    message.delete();
    channelReport.send(reportEmbed)
    user.send(reportEmbed);

}

module.exports.help = {
    name: "warn",
    description: "Dit Is de warn commando"
}